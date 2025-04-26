"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProductToolBanner from "@/components/product-tool/ProductToolBanner";
import ProductList from "@/components/card/ProductList";
import { AirtableModel } from "@/models/airtable.model";
import { useSearchParams, useParams } from "next/navigation";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {
  params: { id: string };
};

export default function ProductDetail({ params }: Props) {
  const id = useSearchParams().get("id");
  const itemPerPageCount = 6;
  const { productList } = useSelector((state: RootState) => state.products);
  const [product, setProductData] = useState<AirtableModel>();
  const { setVisibleItem } = useVisibleItemContextData();
  const currentCategory = product && product!.fields.Tags[0];
  //   const params = useParams();
  const slug = params?.id;
  const getProductFromId = useCallback(() => {
    const productMatched = productList!.find((product: AirtableModel) => {
      const formattedTitle = product?.fields?.Name?.toLowerCase()
        ?.trim()
        ?.replace(/\s/g, "-");
      return formattedTitle === slug;
    });

    if (productMatched) {
      setProductData(productMatched);
    }
  }, [slug, productList]);

  useEffect(() => {
    setVisibleItem(12);

    if (!product) {
      getProductFromId();
    }
  }, [product, id, productList, getProductFromId, setVisibleItem]);

  return (
    <>
      {" "}
      {product && (
        <>
          <ProductToolBanner
            url={product!.fields.ToolImage}
            title={product!.fields.Name}
            description={product!.fields.Description}
            tag={product!.fields.Tags}
            link={product!.fields.WebsiteLink}
            id={product!.id}
            verified={product!.fields.Verified}
            Pricing={product!.fields.Tags[0]}
            detailedMsg={product!.fields["Detailed Description"]}
          />

          <div className="px-4">
            <h2 className="w-full my-6 text-xl font-bold text-center md:text-3xl lg:text-4xl md:my-8">
              Similar{" "}
              <span className="text-DarkOrange">{product!.fields.Tags}</span>{" "}
              Tools
            </h2>
          </div>
        </>
      )}
      <ProductList itemsCount={itemPerPageCount} currentCategory={currentCategory} />
    </>
  );
}
