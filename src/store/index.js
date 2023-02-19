import Vue from 'vue'
import Vuex from 'vuex'
import { ethers } from 'ethers'

import { MANTLE_CONTRACT_ADDRESS, FILECOIN_CONTRACT_ADDRESS }  from '../keys'
import ProofOfChallenge from '../../artifacts/contracts/ProofOfChallenge.sol/ProofOfChallenge.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    walletAddress: "",
    contractPOC: null,
    chainName: ""
  },
  getters: {
    walletAddress: state => state.walletAddress,
    contractPOC: state => state.contractPOC,
    chainName: state => state.chainName
  },
  mutations: {
    setWalletAddress: (state, walletAddress) => (state.walletAddress = walletAddress),
    setContract: (state, contractPOC) => (state.contractPOC = contractPOC),
    setChainName: (state, chainName) => (state.chainName = chainName),
  },
  actions: {
    async connectToBlockchain({ commit }) {
      try{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = ethers.utils.getAddress(accounts[0])
        commit('setWalletAddress', account)

        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const { chainId } = await provider.getNetwork();
        console.log(chainId)

        const signer = provider.getSigner()
        
        if(chainId === 5001){
          const contract = new ethers.Contract(MANTLE_CONTRACT_ADDRESS, ProofOfChallenge.abi, signer)
          commit('setContract', contract)
          console.log(contract)
          commit('setChainName', "Mantle Testnet")
        }
        else if(chainId === 3141){
          const contract = new ethers.Contract(FILECOIN_CONTRACT_ADDRESS, ProofOfChallenge.abi, signer)
          commit('setContract', contract)
          console.log(contract)
          commit('setChainName', "Filecoin Testnet")
        }
      } catch(error) {
        console.log(error)
      }
    },
    async updateWalletAddress({ commit }, walletAddress) {
      try{
        commit('setWalletAddress', walletAddress)
      } catch(error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
