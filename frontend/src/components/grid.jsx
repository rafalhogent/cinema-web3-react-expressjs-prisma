import React from "react";
import Card from "../components/card";

const Grid = (props) => {

    const { items } = props

    return (
        <div className="
                        m-4 lg:m-20 
                        grid grid-cols-1 
                        md:grid-cols-2 
                        lg:grid-cols-3 
                        xl:grid-cols-4
                        2xl:grid-cols-6
                        gap-8">
            {
                items.map(item => {
                    return (
                        <Card key={item.id}
                            id={item.id}
                            title={item.title}
                            year={item.year}
                            image={item.thumbnail}
                            genres={item.genres}
                            text={item.extract}
                        />
                    )
                })
            }
        </div>
    )
}

export default Grid