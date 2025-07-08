import { Fragment } from "react";
import fs from 'fs/promises';
import path from 'path';

const ProductDetail = (props) => {
    const { product } = props;
    if(!product) {
        return <p>Loading...</p>
    }
    return (
        <Fragment>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
        </Fragment>
    );
}

export default ProductDetail;

const getData = async ()=>{
     const filePath = path.join(process.cwd(), 'data', 'dummy_data.json');
    const data = await fs.readFile(filePath)
    const dummyData = JSON.parse(data);
    return dummyData;
}

export async function getStaticProps(context) {
    const { params } = context;
    const { pid } = params;

    const dummyData = await getData();

    const product = dummyData.products.find(product => product.id === pid);
    //Not found scenario
    if(!product) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            product
        }
    }
}

export async function getStaticPaths() {
 // to be generated at build time - dynamic paths
 const data = await getData();
 const ids = data.products.map(product => product.id);
 const pathsWithParams = ids.map(id => ({ params: { pid: id } }));
  return {
    paths: pathsWithParams,
    fallback: false, //allows to generate the page on the fly
  };
}