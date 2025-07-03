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
    setIsLoading(true);
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
      setIsLoading(false);
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
      <div className="relative w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <button
          type="button"
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="bi bi-x"></i>
        </button>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="mb-2 text-2xl font-bold">Filtrage</h1>
          <div className="mb-3 flex flex-col gap-1">
            <label htmlFor="enseignant" className="font-medium">
              Enseignant
            </label>
            <input
              type="text"
              className="rounded border border-gray-300 px-3 py-2"
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
              className="rounded border border-gray-300 px-3 py-2"
              id="etudiant"
              placeholder="Nom de l'étudiant"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-medium">Cours</label>
              <div className="relative">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full appearance-none rounded border border-gray-300 px-3 py-2"
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
                <i className="bi bi-chevron-down pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"></i>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="font-medium">Session</label>
              <div className="relative">
                <select
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="w-full appearance-none rounded border border-gray-300 px-3 py-2"
                >
                  <option value="" disabled>
                    Sélectionner une session
                  </option>
                  {(() => {
                    const currentYear = new Date().getFullYear();
                    const sessions = [];

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
                <i className="bi bi-chevron-down pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"></i>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="flex-1 rounded bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Confirmer"}
            </button>
            <button
              type="button"
              className="flex-1 rounded bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-300"
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
