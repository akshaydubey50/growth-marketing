// export const metadata = {
//   title: "Growth Marketing Tools",
//   description:
//     "Directory of 200+ Growth Marketing Tools designed to streamline your process and enhance productivity.",
// };

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1">
      {children}
    </div>
  );
}
