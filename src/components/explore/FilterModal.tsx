import { FC, useState } from "react";
import { useCourses } from "../../hooks/use-courses";
import {
  useProjectsByCollaborator,
  useProjectsByCourse,
  useProjectsBySession,
  useProjectsByTeacher,
} from "../../hooks/use-project";
import { Projet } from "../../types/Projet";

interface FilterModalProps {
  onClose: () => void;
  onApplyFilters: (projects: Projet[], isSearching: boolean) => void;
}

export const FilterModal: FC<FilterModalProps> = ({
  onClose,
  onApplyFilters,
}) => {
  const [session, setSession] = useState("");
  const [course, setCourse] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: availableCourses = [] } = useCourses();

  const courseProjectsQuery = useProjectsByCourse(course);
  const sessionProjectsQuery = useProjectsBySession(session);
  const teacherProjectsQuery = useProjectsByTeacher(teacher);
  const collaboratorProjectsQuery = useProjectsByCollaborator(student);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (course) {
        const projects = await courseProjectsQuery.refetch();
        onApplyFilters(projects.data || [], true);
      } else if (session) {
        const projects = await sessionProjectsQuery.refetch();
        onApplyFilters(projects.data || [], true);
      } else if (teacher) {
        const projects = await teacherProjectsQuery.refetch();
        onApplyFilters(projects.data || [], true);
      } else if (student) {
        const projects = await collaboratorProjectsQuery.refetch();
        onApplyFilters(projects.data || [], true);
      } else {
        onApplyFilters([], false);
      }
      onClose();
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error);
    }
  };

  const handleClearFilters = () => {
    setTeacher("");
    setCourse("");
    setSession("");
    setStudent("");
    onApplyFilters([], false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        <button
          type="button"
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="bi bi-x"></i>
        </button>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-2">Filtrage</h1>
          <div className="mb-3 flex flex-col gap-1">
            <label htmlFor="enseignant" className="font-medium">
              Enseignant
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2"
              id="enseignant"
              placeholder="Nom de l'enseignant"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
            />
          </div>
          <div className="mb-3 flex flex-col gap-1">
            <label htmlFor="etudiant" className="font-medium">
              Étudiant
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2"
              id="etudiant"
              placeholder="Nom de l'étudiant"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1 gap-1">
              <label className="font-medium">Cours</label>
              <div className="relative">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 appearance-none"
                >
                  <option value="" disabled>
                    Sélectionner un cours
                  </option>
                  {availableCourses.map((course) => (
                    <option key={course.id} value={course.title}>
                      {course.title}
                    </option>
                  ))}
                  <option value="">Aucun</option>
                </select>
                <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <label className="font-medium">Session</label>
              <div className="relative">
                <select
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 appearance-none"
                >
                  <option value="" disabled>
                    Sélectionner une session
                  </option>
                  {(() => {
                    const currentYear = new Date().getFullYear();
                    const currentMonth = new Date().getMonth();
                    const sessions = [];

                    const currentSemester =
                      currentMonth >= 6 ? "Automne" : "Hiver";

                    for (let i = 0; i < 6; i++) {
                      const year = currentYear - Math.floor(i / 2);
                      const semester = i % 2 === 0 ? "Hiver" : "Automne";

                      sessions.push(
                        <option
                          key={`${semester} ${year}`}
                          value={`${semester} ${year}`}
                        >
                          {semester} {year}
                        </option>,
                      );
                    }

                    return sessions;
                  })()}
                  <option value="">Aucune</option>
                </select>
                <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Confirmer"}
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-200 text-gray-700 rounded px-4 py-2 font-semibold hover:bg-gray-300 transition-colors"
              onClick={handleClearFilters}
              disabled={isLoading}
            >
              Supprimer filtres
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
