import { Loading } from "@/components/ui/Loading";
import { Container } from "@/components/ui/Container";

export default function LoadingPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <Container>
        <Loading />
      </Container>
    </main>
  );
}
