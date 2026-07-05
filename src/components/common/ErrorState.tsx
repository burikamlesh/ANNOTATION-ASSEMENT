interface Props {
  message: string;
}

export default function ErrorState({
  message,
}: Props) {
  return (
    <div className="rounded bg-red-50 p-4 text-red-600">
      {message}
    </div>
  );
}