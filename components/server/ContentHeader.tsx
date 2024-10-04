export default async function ContentHeader({
  title = process.env.pageheader,
}: {
  title?: string;
}) {
  return (
    <header className="font-semibold text-3xl pl-10 pr-10 text-gray-500 dark:text-gray-400">
      {title}
    </header>
  );
}
