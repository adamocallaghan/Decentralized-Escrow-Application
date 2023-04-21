import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(ethereum);

export default async function addContract(
  id,
  contract,
  arbiter,
  multisig1,
  multisig2,
  beneficiary,
  value
) {
  const buttonId = `approve-${id}`;

  const container = document.getElementById('container');
  container.innerHTML += createHTML(buttonId, arbiter, multisig1, multisig2, beneficiary, value);

  contract.on('Approved', () => {
    document.getElementById(buttonId).className = 'complete';
    document.getElementById(buttonId).innerText = "✓ It's been approved!";
  });

  document.getElementById(buttonId).addEventListener('click', async () => {
    const signer = provider.getSigner();
    await contract.connect(signer).approve();
  });
}

function createHTML(buttonId, arbiter, multisig1, multisig2, beneficiary, value) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Multisig1 </div>
          <div> ${multisig1} </div>
        </li>
        <li>
          <div> Multisig2 </div>
          <div> ${multisig2} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> ${value} </div>
        </li>
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
}
