import Container from "./(root)/components/Container";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/firm/getFirm", {
    mode: "cors",
    cache: "no-store",
  });
  const list = await res.json();
  return (
    <div>
      <p className=" text-2xl font-semibold mb-3">Hệ thống gợi ý phim</p>
      <Container listFirm={list} />
    </div>
  );
}
