export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center font-['Pretendard'] text-[20px] font-semibold text-zinc-800">
      {title}
    </div>
  );
}
