import Web3 from "web3";
import { walletStore } from "@/stores/donationStore";

export async function createWeb3Instance() {
  let web3;
  const wStore = walletStore();

  const setwallet = (value) => {
    wStore.setwallet(value);
  };

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    alert("MetaMask를 설치하고 로그인한 후 네트워크를 Sepolia로 변경해주세요.");
    window.open("https://metamask.io/");
  }

  try {
    const accounts = await web3.eth.getAccounts();
    setwallet(accounts[0]);
  } catch (e) {
    console.error("지갑을 찾을 수 없음", e);
  }

  return web3;
}

export async function checkWeb3Instance() {
  let web3;
  const wStore = walletStore();

  const setwallet = (value) => {
    wStore.setwallet(value);
  };

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log("이더리움 설치 안되어 있습니다.");
    return null;
  }

  try {
    const accounts = await web3.eth.getAccounts();
    setwallet(accounts[0]);
  } catch (e) {
    console.error("지갑을 찾을 수 없음", e);
  }

  return web3;
}

export async function checkAccountConnection() {
  console.log("여기는 checkAccountConnection");
  const web3 = await checkWeb3Instance();
  console.log(web3);
  if (web3 !== null) {
    console.log("계정을 받아온");
    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) {
      console.log("MetaMask 계정이 연결되어 있지 않습니다.");
      return false;
    } else {
      console.log("MetaMask 계정이 연결되어 있습니다:", accounts[0]);
      return accounts[0];
    }
  } else {
    console.log("여기는 false를 반환");
    return false;
  }
}

// export async function setupContract() {
//   const contractAddress = "스마트_컨트랙트_주소";
//   const ABI = [스마트_컨트랙트_ABI]; // JSON 형식의 ABI를 입력하세요.

//   contractInstance = new web3.eth.Contract(ABI, contractAddress);
// }
