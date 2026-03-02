import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Save, X, Rocket, Package, TrendingUp, Globe, Users, Calendar, Clock, GripVertical } from "lucide-react";

// Mock milestones data (will be replaced with API)
const initialMilestones = [
  {
    id: "1",
    year: "2018",
    title: "Founded",
    description: "TTS was born from a shared vision of three passionate tech enthusiasts who believed in the power of digital transformation.",
    icon: "rocket"
  },
  {
    id: "2",
    year: "2019",
    title: "First Product Launch",
    description: "We launched our flagship web development service, delivering our first major client project.",
    icon: "package"
  },
  {
    id: "3",
    year: "2021",
    title: "Series A Funding",
    description: "Secured $2.5M in Series A funding from leading tech investors.",
    icon: "trending-up"
  },
  {
    id: "4",
    year: "2023",
    title: "Global Expansion",
    description: "Expanded operations to serve clients across 15+ countries.",
    icon: "globe"
  },
  {
    id: "5",
    year: "Present",
    title: "500+ Clients",
    description: "Today, we proudly serve over 500 satisfied clients worldwide.",
    icon: "users"
  }
];

const iconOptions = [
  { value: "rocket", label: "Rocket", Icon: Rocket },
  { value: "package", label: "Package", Icon: Package },
  { value: "trending-up", label: "Trending Up", Icon: TrendingUp },
  { value: "globe", label: "Globe", Icon: Globe },
  { value: "users", label: "Users", Icon: Users },
  { value: "calendar", label: "Calendar", Icon: Calendar },
  { value: "clock", label: "Clock", Icon: Clock },
];

const getIconComponent = (iconName) => {
  const found = iconOptions.find(opt => opt.value === iconName);
  return found ? found.Icon : Rocket;
};

function MilestoneCard({ milestone, onEdit, onDelete, isDragging }) {
  const Icon = getIconComponent(milestone.icon);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`bg-white rounded-xl border ${isDragging ? 'border-violet-400 shadow-lg' : 'border-gray-200'} p-5 transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-start gap-4">
        {/* Drag Handle */}
        <div className="flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 pt-1">
          <GripVertical className="w-5 h-5" />
        </div>

        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-violet-600" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-700">
              {milestone.year}
            </span>
            <h3 className="font-bold text-gray-900 text-lg">{milestone.title}</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <button
            onClick={() => onEdit(milestone)}
            className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(milestone.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function MilestoneForm({ milestone, onSave, onCancel, isNew }) {
  const [formData, setFormData] = useState(
    milestone || {
      year: "",
      title: "",
      description: "",
      icon: "rocket"
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: milestone?.id || Date.now().toString()
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl border border-violet-200 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {isNew ? "Add New Milestone" : "Edit Milestone"}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year / Period
            </label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="e.g., 2024 or Present"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Major Achievement"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
              required
            />
          </div>
        </div>

        {/* Icon Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Icon
          </label>
          <div className="flex flex-wrap gap-2">
            {iconOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, icon: option.value })}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                  formData.icon === option.value
                    ? 'border-violet-500 bg-violet-50 text-violet-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <option.Icon className="w-4 h-4" />
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe this milestone..."
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors resize-none"
            required
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium shadow-sm"
          >
            <Save className="w-4 h-4" />
            {isNew ? "Add Milestone" : "Save Changes"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default function MilestonesManagement() {
  const [milestones, setMilestones] = useState(initialMilestones);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleSave = (milestone) => {
    if (editingMilestone) {
      setMilestones(prev =>
        prev.map(m => m.id === milestone.id ? milestone : m)
      );
      setEditingMilestone(null);
    } else {
      setMilestones(prev => [...prev, milestone]);
      setIsAddingNew(false);
    }
  };

  const handleDelete = (id) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
    setDeleteConfirm(null);
  };

  const handleCancel = () => {
    setEditingMilestone(null);
    setIsAddingNew(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Milestones</h1>
          <p className="text-gray-600 mt-1">
            Manage the timeline milestones displayed on the About page.
          </p>
        </div>
        {!isAddingNew && !editingMilestone && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Add Milestone
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence mode="wait">
        {(isAddingNew || editingMilestone) && (
          <div className="mb-6">
            <MilestoneForm
              milestone={editingMilestone}
              onSave={handleSave}
              onCancel={handleCancel}
              isNew={isAddingNew}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Milestones List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {milestones.map((milestone) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              onEdit={setEditingMilestone}
              onDelete={(id) => setDeleteConfirm(id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {milestones.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No milestones yet</h3>
          <p className="text-gray-600 mb-4">Add your first milestone to showcase your journey.</p>
          <button
            onClick={() => setIsAddingNew(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Add First Milestone
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                Delete Milestone?
              </h3>
              <p className="text-gray-600 text-center mb-6">
                This action cannot be undone. The milestone will be permanently removed from the timeline.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
