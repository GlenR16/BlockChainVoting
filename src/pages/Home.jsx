import { useState, useEffect } from "react";
import { useAccount } from "../context/AccountProvider";
import { ethers } from "ethers";
import { ABI } from "../contracts/Voting";
import { Tabs } from "flowbite-react";

// Written by Glen Rodrigues, Glenn Mendonca, Shubham Ojha.

export default function Home() {
    
	const tabTheme = {
		base: "flex flex-col gap-2 w-full h-full",
		tablist: {
			base: "flex text-center",
			styles: {
				default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
				underline: "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700",
				pills: "flex-wrap font-medium text-sm text-gray-500 dark:text-gray-400 space-x-2",
				fullWidth: "w-full text-sm font-medium divide-x divide-gray-200 shadow grid grid-flow-col dark:divide-gray-700 dark:text-gray-400 rounded-none",
			},
			tabitem: {
				base: "flex items-center justify-center p-4 rounded-t-lg text-base font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
				styles: {
					default: {
						base: "rounded-t-lg",
						active: {
							on: "bg-gray-100 text-cyan-600 dark:bg-gray-800 dark:text-cyan-500 border-b-2",
							off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300",
						},
					},
					underline: {
						base: "rounded-t-lg",
						active: {
							on: "text-cyan-600 rounded-t-lg border-b-2 active dark:text-cyan-500 dark:border-cyan-500",
							off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
						},
					},
					pills: {
						base: "",
						active: {
							on: "rounded-lg bg-cyan-600 text-white",
							off: "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white",
						},
					},
					fullWidth: {
						base: "ml-0 first:ml-0 w-full rounded-none flex",
						active: {
							on: "p-4 text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white rounded-none",
							off: "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-none",
						},
					},
				},
				icon: "mr-2 h-5 w-5",
			},
		},
		tabitemcontainer: {
			base: "",
			styles: {
				default: "",
				underline: "",
				pills: "",
				fullWidth: "",
			},
		},
		tabpanel: "py-3",
	};
	const [loadingConnect, setLoadingConnect] = useState(false);
	const { account, changeAccount, deleteAllAccount } = useAccount();
	const [candidates, setCandidates] = useState([]);
	const [voters, setVoters] = useState([]);
	const [contract, setContract] = useState(null);

	const deleteWallet = () => {
		deleteAllAccount();
	};

	const connectWallet = async (e) => {
		setLoadingConnect(true);
		if (typeof window.ethereum !== "undefined") {
			window.ethereum.request({
				method: "eth_requestAccounts",
			})
            .then((acc) => {
                changeAccount(acc);
                setLoadingConnect(false);
            })
            .catch((error) => {
                alert(error.message);
                setLoadingConnect(false);
            })
		}
	};

	const handleVote = () => {
		contract?.Vote(document.getElementById("name").value, document.getElementById("voter").value, document.getElementById("candidate").value).then((data) => {
			updateCandidates();
		})
        .catch((error) => {
            alert(error.message);
        });
	};
	const handleStandAsCandidate = () => {
		const address = document.getElementById("candAdd");
		const name = document.getElementById("candName");
		contract?.StandAsCandidate(address.value, name.value).then((data) => {
			updateCandidates();
		})
        .catch((error) => {
            alert(error.message);
        });
	};

	function updateCandidates() {
		contract?.getCandidates().then((data) => setCandidates(data));
		contract?.getVoters().then((data) => setVoters(data.target));
	}

	useEffect(() => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		provider.getSigner().then((signer) => {
			const contract = new ethers.Contract("0x168b6B45f4944f8dcc84EBF57677A56E5010d55B", ABI, signer);
			setContract(contract);
		});
	}, [account]);

	useEffect(() => {
		updateCandidates();
	}, [contract]);

	return (
		<section className="h-screen w-full bg-black text-white p-1">
			<div className="rounded-lg h-full flex flex-col">
				<div className="text-center border-b-2 p-2 text-4xl font-semibold pb-4">BlockChain Voting App</div>
				<div className="flex flex-col md:flex-row justify-evenly grow p-4 gap-4">
					<div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col w-full h-full">
						<div className="text-center p-1 text-3xl font-semibold mb-2">Your Portal</div>
						<div className="flex flex-col items-center justify-center grow">
							{account.length > 0 
                            ? 
                            (
                                <Tabs.Group aria-label="System" style="default" theme={tabTheme}>
                                    <Tabs.Item active title="Voting System">
                                        <label htmlFor="voter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Select Voter Account
                                        </label>
                                        <select id="voter" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            {account.map((item) => {
                                                return (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Name
                                        </label>
                                        <input type="text" id="name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                        <label htmlFor="candidate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Select Candidate Account
                                        </label>
                                        <select name="" id="candidate" className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            {candidates.length > 0 &&
                                                candidates.map((cand) => {
                                                    return (
                                                        <option key={cand._CandidateAddress} value={cand._CandidateAddress}>
                                                            {cand.name}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                        <button type="button" className="mb-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full" onClick={handleVote}>
                                            Vote
                                        </button>
                                        <button type="button" className="mb-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-full" onClick={deleteWallet}>
                                            Disconnect Accounts
                                        </button>
                                    </Tabs.Item>
                                    <Tabs.Item title="Candidate System">
                                        <label htmlFor="voter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Select Voter Account
                                        </label>
                                        <select id="candAdd" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            {account.map((item) => {
                                                return (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <label htmlFor="candName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Name
                                        </label>
                                        <input type="text" id="candName" className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                        <button onClick={handleStandAsCandidate} className="mb-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full">
                                            Stand as Candidate
                                        </button>
                                    </Tabs.Item>
                                </Tabs.Group>
							) : (
								<button onClick={connectWallet} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
									<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 inline-flex flex-row">
										Connect to Wallet
										{loadingConnect && (
											<svg fill="#000000" width="20px" height="20px" className="animate-spin fill-green-500 ml-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
												<path d="M18.91.28a1,1,0,0,0-.82.21,1,1,0,0,0-.36.77V5.45a1,1,0,0,0,.75,1,9.91,9.91,0,1,1-5,0,1,1,0,0,0,.75-1V1.26a1,1,0,0,0-.36-.77,1,1,0,0,0-.82-.21,16,16,0,1,0,5.82,0ZM16,30A14,14,0,0,1,12.27,2.51V4.7a11.91,11.91,0,1,0,7.46,0V2.51A14,14,0,0,1,16,30Z" />
											</svg>
										)}
									</span>
								</button>
							)}
						</div>
					</div>

					<div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col w-full h-full">
						<div className="text-center p-1 text-3xl font-semibold mb-4">Candidates Vote Count</div>
						<div className="flex flex-col items-center justify-start grow">
                            <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
							    {
                                    candidates.length > 0 ?
                                    candidates.map((item) => {
                                        return (
                                            <li key={item._CandidateAddress} className="w-full px-4 py-2 border-b border-gray-200 rounded-lg dark:border-gray-600"> {item.name} - {item.votes.toString()} </li>
										);
                                    })
                                    : "No candidates as of yet."
                                }
                            </ul> 
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
