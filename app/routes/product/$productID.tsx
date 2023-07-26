import { useLocation, useParams, useSearchParams } from "@remix-run/react";

const Product = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <h1>Product</h1>
      <h2>{pathname.split('/').pop()}</h2>
    </div>
  );
};

export default Product;
