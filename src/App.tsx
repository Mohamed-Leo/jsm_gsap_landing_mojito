import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <div className="flex-center h-[100vh]">
      <h1 className="text-9xl text-indigo-300">Hello Gsap!</h1>
    </div>
  );
}

export default App;
