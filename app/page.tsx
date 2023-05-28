"use client";

import Image from "next/image";

import Container from "~/components/Container";
import Categories from "~/components/Categories";
import ProductCard from "~/components/card/ProductCard";
import {products} from "./data";
import Heading from "~/components/Heading";
import Search from "~/components/navbar/Search";

const list = products.slice(0, 10);

function Home() {

    return (
        <Container>
            <div className="pt-24 border-2 border-b-2 rounded-b-2xl">
                <div className="relative w-full h-max">
                    <Image
                        src="/images/logo.webp"
                        alt={"Anh"}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="object-cover w-full h-[50vh]"
                    />
                </div>
                <Categories/>
            </div>

            <div className="
                    flex flex-row
                ">
                <div className='py-6'>
                    <div className='flex flex-row justify-between p-4'>
                        <Heading title={"Category name"} center/>
                        <Search/>
                    </div>
                    <hr className='mb-10'/>
                    <div className='
                            gap-4
                            grid
                            grid-cols-2
                            sm:grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                        '>
                        {list.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Home;
