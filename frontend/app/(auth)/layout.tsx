export default function AuthLayout({ children }:any) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      {children}
    </div>
  );
}
