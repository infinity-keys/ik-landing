import 'reflect-metadata'

import { SnickerdoodleWebIntegration } from '@snickerdoodlelabs/web-integration'
import { ethers } from 'ethers'

import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button'
const webIntegrationConfig = {}

const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signerInstance = provider.getSigner()

    const webIntegration = new SnickerdoodleWebIntegration(
      webIntegrationConfig,
      signerInstance
    )

    webIntegration
      .initialize()
      .map((sdlDataWallet) => {
        console.log('success', sdlDataWallet)
        // Implement your success logic here
      })
      .mapErr((err) => {
        console.error('err: ', err)
        // Implement your error handling logic here
      })
  } else {
    console.error('Ethereum provider not detected')
  }
}

const SnickerdoodlePage = () => {
  return (
    <>
      <MetaTags title="Snickerdoodle" description="Snickerdoodle page" />

      <div className="p-12 text-white">
        <p>Want to be tracked?</p>
        <Button text="Yes" onClick={connectWallet} />
      </div>
    </>
  )
}

export default SnickerdoodlePage
