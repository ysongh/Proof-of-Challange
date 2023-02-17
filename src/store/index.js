import Vue from 'vue'
import Vuex from 'vuex'
import { ethers } from 'ethers'

import { CONTRACT_ADDRESS }  from '../keys'
import ProofOfChallenge from '../../artifacts/contracts/ProofOfChallenge.sol/ProofOfChallenge.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    walletAddress: "",
    contractPOC: null
  },
  getters: {
    walletAddress: state => state.walletAddress,
    contractPOC: state => state.contractPOC
  },
  mutations: {
    setWalletAddress: (state, walletAddress) => (state.walletAddress = walletAddress),
    setContract: (state, contractPOC) => (state.contractPOC = contractPOC),
  },
  actions: {
    async connectToBlockchain({ commit }) {
      try{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = ethers.utils.getAddress(accounts[0])
        commit('setWalletAddress', account)

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ProofOfChallenge.abi, signer)
        commit('setContract', contract)
        console.log(contract)

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
