import Repo from './Repo/page';

async function getRepoData(repoID) {
  const response = await fetch(`https://api.github.com/repositories/${repoID}`);
  const product = await response.json();
  return product;
}

export default async function ProductView({ params }) {
  const allData = await getRepoData(params.productID);
  return (
    <Repo allData={allData} />
  )
}