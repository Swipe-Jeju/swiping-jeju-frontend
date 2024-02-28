import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function HomeStyleInput({ swipingAlbum, setSwipingAlbum }) {
    const [inputText, setInputText] = useState("");
    const router = useRouter();

    const handleSubmit = () => {
        // API 호출을 위해 새로운 상태를 설정하고, 설정된 상태를 바로 사용하여 API 호출
        const updatedAlbum = {
            ...swipingAlbum,
            title: inputText,
        };

        // 상태 업데이트
        setSwipingAlbum(updatedAlbum);

        // 업데이트된 swipingAlbum 상태를 사용하여 API 호출
        postAlbumToAPI(updatedAlbum);

        // 스와이핑 페이지로 이동
        // router.push(`/result`);

        const id = 3;
        // 일단은 결과 페이지로 이동
        router.push(`/result/${id}`);
    };

    // API에 데이터를 POST하는 함수
    const postAlbumToAPI = async (album) => {
        try {
            console.log("API 호출 시작:", album);
            // const response = await fetch("YOUR_API_ENDPOINT", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(album),
            // });

            // if (!response.ok) {
            //     throw new Error("API 호출 실패");
            // }

            // const data = await response.json();
            // console.log("API 호출 결과:", data);
        } catch (error) {
            console.error("API 호출 중 에러 발생:", error);
        }
    };

    return (
        <>
            <input
                type="text"
                placeholder="원하는 스타일 입력"
                onChange={(e) => setInputText(e.target.value)}
                value={inputText}
            />
            <button onClick={handleSubmit}>제출</button>
        </>
    );
}

export default HomeStyleInput;
