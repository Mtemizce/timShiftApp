// ✅ frontend/modules/Definitions/Index.jsx (drag & drop dahil)

import { useEffect, useState } from "react";
import {
  fetchDefinitionsByType,
  deleteDefinition,
  toggleDefinitionActive,
  updateDefinition
} from "./services/definitionsService";
import CreateForm from "./pages/CreateForm";
import DefinitionEditModal from "./components/DefinitionEditModal";
import { notify, notifyConfirm } from "@/utils/notify";
import {
  Trash2,
  Pencil,
  CheckCircle,
  CircleOff
} from "lucide-react";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ item, onEdit, onDelete, onToggle }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 flex items-center justify-between shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <span className="font-medium text-gray-900 dark:text-white">
        {item.key}
      </span>
      <div className="flex gap-3 items-center">
        <button onClick={() => onToggle(item)}>
          <CheckCircle className="w-5 h-5 text-green-500 hover:text-green-600 cursor-pointer" />
        </button>
        <Pencil
          className="w-4 h-4 text-gray-500 hover:text-blue-600 cursor-pointer"
          title="Düzenle"
          onClick={() => onEdit(item)}
        />
        <Trash2
          className="w-4 h-4 text-red-600 hover:text-red-800 cursor-pointer"
          title="Sil"
          onClick={() => onDelete(item.id)}
        />
      </div>
    </div>
  );
}

export default function DefinitionIndex() {
  const [type, setType] = useState("personnel_type");
  const [list, setList] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [activeItems, setActiveItems] = useState([]);

  const loadData = async () => {
    try {
      const data = await fetchDefinitionsByType(type);
      setList(data);
    } catch (err) {
      notify("Hata", err.message, {
        toastr: true,
        duration: 3000,
        icon: "error"
      });
    }
  };

  useEffect(() => {
    loadData();
  }, [type]);

  useEffect(() => {
    setActiveItems(list.filter((i) => i.active));
  }, [list]);

  const handleDelete = async (id) => {
    const onay = await notifyConfirm({
      title: "Silmek istediğinize emin misiniz?",
      text: "Bu işlem geri alınamaz."
    });
    if (!onay) return;
    try {
      await deleteDefinition(id);
      notify("Silindi", "Tanım silindi", { toastr: true });
      loadData();
    } catch (err) {
      notify("Hata", err.message, {
        toastr: true,
        duration: 3000,
        icon: "error"
      });
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await toggleDefinitionActive(item.id, !item.active);
      loadData();
    } catch (err) {
      notify("Hata", err.message, { toastr: true, icon: "error" });
    }
  };

  const openEditModal = (item) => {
    setEditData(item);
    setEditModalOpen(true);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = activeItems.findIndex((i) => i.id === active.id);
      const newIndex = activeItems.findIndex((i) => i.id === over.id);
      const newList = arrayMove(activeItems, oldIndex, newIndex);
      setActiveItems(newList);
      for (let i = 0; i < newList.length; i++) {
        await updateDefinition(newList[i].id, { order: i + 1 });
      }
      loadData();
    }
  };

  const pasifList = list.filter((item) => !item.active);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Tanım Yönetimi</h2>

      <div className="mb-6">
        <label className="text-sm font-medium block mb-2">Tanım Türü:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input w-full md:w-60"
        >
          <option value="personnel_type">Görev</option>
          <option value="department">Birim</option>
          <option value="education">Eğitim</option>
          <option value="size_pants">Pantolon</option>
          <option value="size_tshirt">Tişört</option>
          <option value="size_shoes">Ayakkabı</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Aktif Grup (DnD) */}
          {activeItems.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Aktif Tanımlar (Sürükleyerek sıralayabilirsiniz)
              </h3>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                  items={activeItems.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {activeItems.map((item) => (
                      <SortableItem
                        key={item.id}
                        item={item}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                        onToggle={handleToggleActive}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {/* Pasif Grup */}
          {pasifList.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 mt-4">
                Pasif Tanımlar
              </h3>
              <div className="space-y-2">
                {pasifList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 flex items-center justify-between shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.key}
                    </span>
                    <div className="flex gap-3 items-center">
                      <button onClick={() => handleToggleActive(item)}>
                        <CircleOff className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
                      </button>
                      <Pencil
                        className="w-4 h-4 text-gray-500 hover:text-blue-600 cursor-pointer"
                        title="Düzenle"
                        onClick={() => openEditModal(item)}
                      />
                      <Trash2
                        className="w-4 h-4 text-red-600 hover:text-red-800 cursor-pointer"
                        title="Sil"
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <CreateForm type={type} onSuccess={loadData} />
      </div>

      <DefinitionEditModal
        open={editModalOpen}
        data={editData}
        onClose={() => setEditModalOpen(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
