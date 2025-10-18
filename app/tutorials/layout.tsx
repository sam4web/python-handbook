import TutorialsList from "./_components/tutorials-list";

export default function TutorialsLayout({ children }: { children: Readonly<React.ReactNode> }) {
  return (
    <div className="">
      <TutorialsList />
      <article className="ml-72">{children}</article>
    </div>
  );
}
