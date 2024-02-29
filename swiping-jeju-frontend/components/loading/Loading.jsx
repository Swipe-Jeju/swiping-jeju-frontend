import React from "react";
import styled from "styled-components";
import Image from "next/image";

const Loading = () => {
    const Overlay = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    return (
        <Overlay>
            <Image
                src="/images/loading.gif"
                alt="Loading"
                width={200}
                height={200}
            />
        </Overlay>
    );
};

export default Loading;
