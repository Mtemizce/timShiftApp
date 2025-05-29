import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePersonnelStore from "@/store/personnel";
import { useDefinitionsStore } from "@/store/definitionsStore";
import Topbar from "./../components/Topbar";
import PersonnelFormFields from "../components/PersonnelFormFields";
import { notify } from "@/utils/notify";

export default function EditPersonnel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPersonnelById, selectedPersonnel } = usePersonnelStore();
  const { definitions, fetchDefinitions } = useDefinitionsStore();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const groupedDefinitions = definitions.reduce((acc, curr) => {
    if (!acc[curr.type]) acc[curr.type] = [];
    acc[curr.type].push(curr.key);
    return acc;
  }, {});

  useEffect(() => {
    const load = async () => {
      await fetchDefinitions();
      await getPersonnelById(id);
      setReady(true);
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    setLoading(true);
    try {
      const res = await fetch(`/api/personnel/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        notify("Hata", `${errorData?.errors?.[0]?.msg} (${errorData?.errors?.[0]?.path})`, {
          toastr: true,
          duration: 3000,
          icon: "error",
        });
        return;
      }

      notify("Başarılı", "Personel başarıyla güncellendi", { icon: "success", duration: 2000 });
      navigate("/personnel");
    } catch (err) {
      notify("Hata", err.message, { toastr: true, duration: 3000, icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!ready || !selectedPersonnel) return <div className="p-4">Yükleniyor...</div>;

  return (
    <>
      <Topbar />
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto p-6 dark:bg-gray-900 rounded-lg shadow"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4">Personel Güncelle</h2>
        <PersonnelFormFields
          definitions={groupedDefinitions}
          defaultValues={selectedPersonnel}
          loading={loading}
        />
      </form>
    </>
  );
}