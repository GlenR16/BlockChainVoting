import Home from "./pages/Home";
import "./App.css";
import { AccountProvider } from "./context/AccountProvider";

function App() {
	return (
		<AccountProvider>
			<Home />
		</AccountProvider>
	);
}

export default App;
