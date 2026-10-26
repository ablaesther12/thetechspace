import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Edit2, Trash2, Save, X, Rocket, Package, TrendingUp, Globe, Users, Calendar, Clock } from "lucide-react";

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

function MilestoneCard({ milestone, onEdit, onDelete }) {
  const Icon = getIconComponent(milestone.icon);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-panel rounded-xl border border-line p-4 sm:p-5"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-brand-soft rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-canvas text-ink/85 tabular-nums">
              {milestone.year}
            </span>
            <h3 className="font-semibold text-ink text-base sm:text-lg">{milestone.title}</h3>
          </div>
          <p className="text-dim text-sm leading-relaxed">{milestone.description}</p>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(milestone)}
            aria-label={`Edit ${milestone.title}`}
            className="grid place-items-center w-10 h-10 text-dim hover:text-ink hover:bg-canvas rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(milestone.id)}
            aria-label={`Delete ${milestone.title}`}
            className="grid place-items-center w-10 h-10 text-dim hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
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
      className="bg-white rounded-xl border border-brand/30 p-5 sm:p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-ink">
          {isNew ? "Add milestone" : "Edit milestone"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close form"
          className="grid place-items-center w-10 h-10 text-dim hover:text-ink hover:bg-canvas rounded-lg transition-colors"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Year */}
          <div>
            <label htmlFor="milestone-year" className="block text-sm font-medium text-ink/85 mb-1.5">
              Year / Period
            </label>
            <input
              id="milestone-year"
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="e.g., 2024 or Present"
              className="w-full px-4 py-2.5 border border-line-strong rounded-lg focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="milestone-title" className="block text-sm font-medium text-ink/85 mb-1.5">
              Title
            </label>
            <input
              id="milestone-title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Major Achievement"
              className="w-full px-4 py-2.5 border border-line-strong rounded-lg focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
              required
            />
          </div>
        </div>

        {/* Icon Selection */}
        <div>
          <p id="milestone-icon-label" className="block text-sm font-medium text-ink/85 mb-1.5">
            Icon
          </p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="milestone-icon-label">
            {iconOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={formData.icon === option.value}
                onClick={() => setFormData({ ...formData, icon: option.value })}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                  formData.icon === option.value
                    ? 'border-brand bg-brand-soft text-brand'
                    : 'border-line hover:border-line-strong text-ink/85'
                }`}
              >
                <option.Icon className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="milestone-description" className="block text-sm font-medium text-ink/85 mb-1.5">
            Description
          </label>
          <textarea
            id="milestone-description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe this milestone..."
            rows={3}
            className="w-full px-4 py-2.5 border border-line-strong rounded-lg focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors resize-none"
            required
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-ink/85 hover:bg-canvas rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand hover:bg-brand-bright text-white rounded-lg transition-colors font-medium"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            {isNew ? "Add milestone" : "Save changes"}
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

  useEffect(() => {
    if (!deleteConfirm) return;
    const onKey = (e) => e.key === "Escape" && setDeleteConfirm(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deleteConfirm]);

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
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ink">Milestones</h1>
          <p className="text-dim text-sm mt-1">
            Manage the timeline milestones displayed on the About page.
          </p>
        </div>
        {!isAddingNew && !editingMilestone && (
          <button
            type="button"
            onClick={() => setIsAddingNew(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 bg-brand hover:bg-brand-bright text-white text-sm rounded-lg transition-colors font-semibold"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add milestone
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
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-line">
          <Calendar className="w-10 h-10 text-dim mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-ink mb-2">No milestones yet</h2>
          <p className="text-dim mb-4">Add your first milestone to showcase your journey on the About page.</p>
          <button
            type="button"
            onClick={() => setIsAddingNew(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand-bright text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add first milestone
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
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-milestone-title"
              aria-describedby="delete-milestone-desc"
              className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" aria-hidden="true" />
              </div>
              <h2 id="delete-milestone-title" className="text-lg font-bold text-ink text-center mb-2">
                Delete this milestone?
              </h2>
              <p id="delete-milestone-desc" className="text-dim text-center mb-6">
                This action cannot be undone. The milestone will be permanently removed from the timeline.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  autoFocus
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 border border-line-strong text-ink/85 rounded-lg hover:bg-canvas transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
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
