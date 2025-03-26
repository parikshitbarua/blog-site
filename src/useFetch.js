import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal})
                .then(res => {
                    if (!res.ok) {
                        throw Error("Failed to fetch data for the resource");
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setError(null);
                    setIsPending(false);
                })
                .catch(err => {
                    if (err.name === "AbortError") {
                        console.log("fetch aborted");
                    } else {
                        setError(err.message);
                        setIsPending(false);
                    }
                });
        }, 1000);

        return () => {
            console.log("cleanup");
            abortCont.abort();
        }
    }, [url]);

    return { data, isPending, error };
};

export default useFetch;