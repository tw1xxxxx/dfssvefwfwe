
import TelegramBot from 'node-telegram-bot-api';
import path from 'path';
import fs from 'fs/promises';
import { getPosts, createPost, updatePost, deletePost, Post } from '../src/lib/posts-db';

// Ensure token is present
const token = '8455902996:AAHKH6cocodHUFXXrzH7mrA8Yc0FuKetFng';
const adminChatId = 868522391;

const bot = new TelegramBot(token, { polling: true });

console.log('Bot is starting...');

type BotState = 
  | 'IDLE' 
  | 'WIZARD_TITLE' 
  | 'WIZARD_EXCERPT'
  | 'WIZARD_TAGS' 
  | 'WIZARD_CONTENT' 
  | 'WIZARD_REVIEW' 
  | 'WIZARD_DATE'
  | 'EDIT_SELECT'
  | 'DELETE_SELECT';

interface Session {
  state: BotState;
  draft: Partial<Post>;
  originalSlug?: string; // For editing existing posts
}

const sessions = new Map<number, Session>();

// Keyboards
const mainMenu = {
  reply_markup: {
    keyboard: [[{ text: '📰 Новости' }]],
    resize_keyboard: true,
  },
};

const newsMenu = {
  reply_markup: {
    keyboard: [
      [{ text: '➕ Создать' }, { text: '✏️ Изменить' }],
      [{ text: '🗑️ Удалить' }, { text: '⬅️ Назад' }],
    ],
    resize_keyboard: true,
  },
};

const cancelKeyboard = {
  reply_markup: {
    keyboard: [[{ text: '❌ Отмена' }]],
    resize_keyboard: true,
  },
};

const reviewKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: '✅ Опубликовать' }],
      [{ text: '✏️ Изм. Заголовок' }, { text: '✏️ Изм. Текст' }],
      [{ text: '✏️ Изм. Превью' }, { text: '✏️ Изм. Теги' }],
      [{ text: '👁️ Предпросмотр' }, { text: '❌ Отмена' }]
    ],
    resize_keyboard: true
  }
};

function getSession(chatId: number): Session {
  if (!sessions.has(chatId)) {
    sessions.set(chatId, { state: 'IDLE', draft: {} });
  }
  return sessions.get(chatId)!;
}

function resetSession(chatId: number) {
  sessions.set(chatId, { state: 'IDLE', draft: {} });
}

function slugify(text: string): string {
  return transliterate(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function transliterate(word: string): string {
  const answer: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya'
  };
  return word.split('').map(char => answer[char.toLowerCase()] || char).join("");
}

async function showReview(chatId: number, session: Session) {
  const draft = session.draft;
  // Ensure slug exists
  if (!draft.slug) {
    draft.slug = slugify(draft.title || 'untitled');
  }
  
  const previewUrl = `http://localhost:3000/blog/${draft.slug}`;
  
  const msg = `
<b>🔍 Предпросмотр новости</b>

<b>Заголовок:</b> ${draft.title}
<b>Slug:</b> ${draft.slug}
<b>Превью (Excerpt):</b> ${draft.excerpt || 'Не задано'}
<b>Теги:</b> ${draft.tags?.join(', ') || 'Нет тегов'}

<b>Мета-теги (Авто):</b>
Title: ${draft.metaTitle || 'Не сгенерировано'}
Desc: ${draft.metaDescription || 'Не сгенерировано'}
Keywords: ${draft.metaKeywords?.join(', ') || 'Не сгенерировано'}

<a href="${previewUrl}">🔗 Ссылка на демо версию</a>
(Нажмите, чтобы открыть в браузере)

Выберите действие:
`;
  await bot.sendMessage(chatId, msg, { parse_mode: 'HTML', ...reviewKeyboard });
}

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (chatId !== adminChatId) {
    bot.sendMessage(chatId, 'Доступ запрещен.');
    return;
  }

  if (!text) return;

  const session = getSession(chatId);

  // Global cancel
  if (text === '❌ Отмена') {
    resetSession(chatId);
    bot.sendMessage(chatId, 'Действие отменено.', newsMenu);
    return;
  }

  if (text === '⬅️ Назад') {
    resetSession(chatId);
    bot.sendMessage(chatId, 'Главное меню', mainMenu);
    return;
  }

  if (text === '/start') {
    resetSession(chatId);
    bot.sendMessage(chatId, 'Завод по производству новостей 🏭', mainMenu);
    return;
  }

  try {
    switch (session.state) {
      case 'IDLE':
        if (text === '📰 Новости') {
          bot.sendMessage(chatId, 'Меню управления новостями:', newsMenu);
        } else if (text === '➕ Создать') {
          session.state = 'WIZARD_TITLE';
          session.draft = {};
          bot.sendMessage(chatId, 'Введите заголовок новости:', cancelKeyboard);
        } else if (text === '✏️ Изменить') {
          const posts = await getPosts();
          if (posts.length === 0) {
            bot.sendMessage(chatId, 'Нет новостей.');
            return;
          }
          const buttons = posts.slice(-10).map(p => [{ text: p.title, callback_data: `edit:${p.slug}` }]);
          bot.sendMessage(chatId, 'Выберите новость для редактирования:', {
            reply_markup: { inline_keyboard: buttons }
          });
          session.state = 'EDIT_SELECT';
        } else if (text === '🗑️ Удалить') {
          const posts = await getPosts();
          if (posts.length === 0) {
            bot.sendMessage(chatId, 'Нет новостей.');
            return;
          }
          const buttons = posts.slice(-10).map(p => [{ text: `❌ ${p.title}`, callback_data: `del:${p.slug}` }]);
          bot.sendMessage(chatId, 'Выберите новость для удаления:', {
            reply_markup: { inline_keyboard: buttons }
          });
          session.state = 'DELETE_SELECT';
        }
        break;

      case 'WIZARD_TITLE':
        session.draft.title = text;
        if (!session.draft.slug) {
          session.draft.slug = slugify(text);
        }
        // If editing, go back to review
        if (session.originalSlug) {
           session.state = 'WIZARD_REVIEW';
           showReview(chatId, session);
        } else {
          session.state = 'WIZARD_EXCERPT';
          bot.sendMessage(chatId, 'Введите краткое описание (превью) для новости:', cancelKeyboard);
        }
        break;

      case 'WIZARD_EXCERPT':
        session.draft.excerpt = text;
        if (session.originalSlug) {
           session.state = 'WIZARD_REVIEW';
           showReview(chatId, session);
        } else {
          session.state = 'WIZARD_TAGS';
          bot.sendMessage(chatId, 'Введите теги через запятую:', cancelKeyboard);
        }
        break;

      case 'WIZARD_TAGS':
        session.draft.tags = text.split(',').map(t => t.trim()).filter(Boolean);
        if (session.originalSlug) {
           session.state = 'WIZARD_REVIEW';
           showReview(chatId, session);
        } else {
          session.state = 'WIZARD_CONTENT';
          bot.sendMessage(chatId, 'Введите основной текст новости:', cancelKeyboard);
        }
        break;

      case 'WIZARD_CONTENT':
        // Basic parsing
        session.draft.content = text.split('\n\n').map(p => ({ type: 'p', text: p.trim() }));
        
        // Auto-generate meta if not set
        if (!session.draft.metaTitle) session.draft.metaTitle = session.draft.title;
        if (!session.draft.metaDescription) session.draft.metaDescription = session.draft.excerpt || text.slice(0, 150) + '...';
        if (!session.draft.metaKeywords) session.draft.metaKeywords = session.draft.tags;
        
  // Save draft
  session.draft.published = false;
  session.draft.date = new Date().toISOString().split('T')[0];

  // Save to DB (create or update)
  if (session.originalSlug) {
      await updatePost(session.originalSlug, session.draft);
  } else {
      // Check if slug exists, if so append random
      try {
        await createPost(session.draft as Post);
      } catch (e) {
        // If exists, likely we are re-saving draft
        await updatePost(session.draft.slug!, session.draft);
      }
  }

  session.state = 'WIZARD_REVIEW';
  showReview(chatId, session);
  break;

      case 'WIZARD_REVIEW':
        if (text === '✅ Опубликовать') {
          session.state = 'WIZARD_DATE';
          bot.sendMessage(chatId, 'Введите дату публикации (YYYY-MM-DD) или "Сегодня":', cancelKeyboard);
        } else if (text === '✏️ Изм. Заголовок') {
          session.state = 'WIZARD_TITLE';
          bot.sendMessage(chatId, 'Введите новый заголовок:', cancelKeyboard);
        } else if (text === '✏️ Изм. Текст') {
          session.state = 'WIZARD_CONTENT';
          bot.sendMessage(chatId, 'Введите новый текст:', cancelKeyboard);
        } else if (text === '✏️ Изм. Превью') {
          session.state = 'WIZARD_EXCERPT';
          bot.sendMessage(chatId, 'Введите новое краткое описание:', cancelKeyboard);
        } else if (text === '✏️ Изм. Теги') {
          session.state = 'WIZARD_TAGS';
          bot.sendMessage(chatId, 'Введите новые теги:', cancelKeyboard);
        } else if (text === '👁️ Предпросмотр') {
           showReview(chatId, session);
        }
        break;

      case 'WIZARD_DATE':
        let date = text;
        if (['сегодня', 'today'].includes(text.toLowerCase())) {
          date = new Date().toISOString().split('T')[0];
        }
        
        session.draft.date = date;
        session.draft.published = true;
        
        if (session.originalSlug) {
           await updatePost(session.originalSlug, session.draft);
        } else {
           await updatePost(session.draft.slug!, session.draft);
        }
        
        bot.sendMessage(chatId, `✅ Новость успешно опубликована!`, newsMenu);
        resetSession(chatId);
        break;
    }
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, `Ошибка: ${error}`);
  }
});

bot.on('callback_query', async (query) => {
  const chatId = query.message?.chat.id;
  if (!chatId || chatId !== adminChatId) return;

  const data = query.data;
  if (!data) return;

  const session = getSession(chatId);

  if (data.startsWith('del:')) {
    const slug = data.split(':')[1];
    await deletePost(slug);
    bot.answerCallbackQuery(query.id, { text: 'Удалено' });
    bot.sendMessage(chatId, `Новость ${slug} удалена.`, newsMenu);
    resetSession(chatId);
  } else if (data.startsWith('edit:')) {
    const slug = data.split(':')[1];
    const posts = await getPosts();
    const post = posts.find(p => p.slug === slug);
    
    if (post) {
      session.draft = { ...post };
      session.originalSlug = slug;
      session.state = 'WIZARD_REVIEW';
      
      // Ensure content is parsed back to text if needed for editing? 
      // For now, if user clicks Edit Text, they overwrite it. 
      // Ideally we should send them current text.
      
      bot.answerCallbackQuery(query.id);
      showReview(chatId, session);
    }
  }
});

console.log('Bot started!');
