
import fs from 'fs/promises';
import path from 'path';
import List from 'next/link';
function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => {return <li key={product.id}><List href={`/${product.id}`}>{product.title}</List></li>})}  
    </ul>
  );
}

export default HomePage;

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy_data.json');
  const data = await fs.readFile(filePath)
  // const dummyData = [
  //   { id: "p1", title: "Product 1", description: "This is product 1" },
  //   { id: "p2", title: "Product 2", description: "This is product 2" },
  //   { id: "p3", title: "Product 3", description: "This is product 3" },
  // ];
  const dummyData = JSON.parse(data);
  if(!dummyData) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  } 

  if(dummyData.length === 0) {
    return {notFound: true};
  }



  return {
    props: {
      products: dummyData.products,
    },
    revalidate: 10, //Larger number means less often page regenerated
  };
}
