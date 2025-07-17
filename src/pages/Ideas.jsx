import { useEffect, useState } from "react";
import CardIdea from "../Components/cardIdeas";
import Banner from "../Components/Banner";
import PaginationSection from "../Components/paginationSection";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("-published_at")
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(false);
      const params = new URLSearchParams({
        'page[number]': page,
        'page[size]': perPage,
        sort: sort,
        'append[]': 'small_image',
        'append[]': 'medium_image',
      });

      try {
        const res = await fetch(`https://suitmedia-backend.suitdev.com/api/ideas?${params.toString()}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("API response:", data);

        if (Array.isArray(data.data)) {
          setIdeas(data.data);
          setTotalItem(data.meta?.total || 0);
        } else {
          setIdeas([]);
          setTotalItem(0);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching ideas:", err);
        setError("Gagal mengambil data ideas");
        setLoading(false);
      }
    };


    fetchIdeas();
  }, [sort, perPage, page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="">
      <Banner
        title="Ideas"
        subtitle="Where all our great things begin"
      />
      <div className="pt-5 mb-4 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="p-2">
            Showing {((page - 1) * perPage) + 1}
            -
            {Math.min(page * perPage, totalItem)} of {totalItem} items
          </p>
        </div>
        <div className="flex flex-row md:flex-row md:items-center gap-4">
          <div>
            <label htmlFor="">Sort by </label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 appearance-none">
              <option value="-published_at">Terbaru</option>
              <option value="published_at">Terlama</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Show per page </label>
            <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 appearance-none">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
      {ideas.length === 0 ? (
        <p className="p-4 text-gray-600">Belum ada ide yang tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {ideas.map((item) =>
            item && item.id ? (
              <CardIdea key={item.id} idea={item} />
            ) : null
          )}
        </div>
      )}
      
      <div>
        <PaginationSection page={page} setPage={setPage} totalPages={Math.ceil(totalItem / perPage)}/>
      </div>
    </div>
  );
};

export default Ideas;
