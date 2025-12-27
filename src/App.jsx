import Slideshow from "./components/Slideshow";

export default function App() {
  return (
    <div
      className="font-nothing w-full h-screen bg-cover bg-center bg-black"
      style={{
        backgroundImage: "url('/images/background.png')",
      }}
    >
      <Slideshow />
    </div>
  );
}