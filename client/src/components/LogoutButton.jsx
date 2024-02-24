export default function Logout() {
  return (
        <button onClick={() => {
            localStorage.removeItem("access_token");
            window.location.reload();
        }}>Logout</button>
  );
}