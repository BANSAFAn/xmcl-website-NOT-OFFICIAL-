import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log(`
██╗  ██╗███╗   ███╗ ██████╗ ██╗     
╚██╗██╔╝████╗ ████║██╔════╝ ██║     
 ╚███╔╝ ██╔████╔██║██║      ██║     
 ██╔██╗ ██║╚██╔╝██║██║      ██║     
██╔╝ ██╗██║ ╚═╝ ██║╚██████╗ ███████╗ 
╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚══════╝

THE BEST LAUNCHER !
`);

createRoot(document.getElementById("root")!).render(<App />);
