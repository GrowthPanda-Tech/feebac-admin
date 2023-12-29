export default function StatusChip({ status }) {
  let style = "bg-[#49A74024] text-[#48A740] border-[#48A740]";

  if (!status) {
    style = "bg-[#EA525F1F] text-[#EA525F] border-[#EA525F]";
  }

  return (
    <span className={`${style} rounded-md border px-4`}>
      {status ? "Public" : "Private"}
    </span>
  );
}
