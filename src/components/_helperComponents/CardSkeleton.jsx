import React from "react";
import Skeleton from "react-loading-skeleton";

function CardSkeleton({ card }) {
    return Array(card)
        .fill(0)
        .map((_, i) => (
            <div className="flex relative flex-col justify-between bg-inherit h-[430px] p-0">
                <div className="">
                    <Skeleton height={430} containerClassName="flex-1" />
                </div>

                <div className="absolute bottom-0 gap-4 left-0 p-2">
                    <Skeleton
                        count={1}
                        height={200}
                        width={"27rem"}
                        baseColor="#EAEDEC"
                        className="mb-[6rem]"
                        containerClassName="flex-1"
                    />

                    <Skeleton
                        count={1}
                        height={20}
                        width={"10rem"}
                        baseColor="#EAEDEC"
                        className="ms-4"
                        containerClassName="flex-1"
                    />
                    <Skeleton
                        count={1}
                        height={20}
                        width={"5rem"}
                        baseColor="#EAEDEC"
                        className="ms-4"
                        containerClassName="flex-1"
                    />
                    <Skeleton
                        count={1}
                        height={20}
                        width={"12rem"}
                        baseColor="#EAEDEC"
                        className="ms-4"
                        containerClassName="flex-1"
                    />
                    <Skeleton
                        count={1}
                        height={30}
                        borderRadius={"2rem"}
                        width={"5rem"}
                        baseColor="#EAEDEC"
                        className="m-2 ms-4"
                        containerClassName="flex-1 "
                    />
                </div>
            </div>
        ));
}

export default CardSkeleton;
