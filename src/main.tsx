import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// ASCII-арт XMCL для консоли
console.log(`
██╗  ██╗███╗   ███╗ ██████╗ ██╗     
╚██╗██╔╝████╗ ████║██╔════╝ ██║     
 ╚███╔╝ ██╔████╔██║██║      ██║     
 ██╔██╗ ██║╚██╔╝██║██║      ██║     
██╔╝ ██╗██║ ╚═╝ ██║╚██████╗ ███████╗ 
╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚══════╝
`);

createRoot(document.getElementById("root")!).render(<App />);
