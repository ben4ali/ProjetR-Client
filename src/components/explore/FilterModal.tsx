import { useState } from "react";
import { useCourses } from "../../hooks/use-courses";
import {
  useProjectsByCourse,
  useProjectsBySession,
  useProjectsByTeacher,
  useProjectsByCollaborator,
} from "../../hooks/use-project";
import { Projet } from "../../types/Projet";

interface FilterModalProps {
  onClose: () => void;
  onApplyFilters: (projects: Projet[]) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
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
        onApplyFilters(projects.data || []);
      } else if (session) {
        const projects = await sessionProjectsQuery.refetch();
        onApplyFilters(projects.data || []);
      } else if (teacher) {
        const projects = await teacherProjectsQuery.refetch();
        onApplyFilters(projects.data || []);
      } else if (student) {
        const projects = await collaboratorProjectsQuery.refetch();
        onApplyFilters(projects.data || []);
      } else {
        onApplyFilters([]);
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
    onApplyFilters([]);
    onClose();
  };

  return (
    <div className="filter-modal">
      <div className="filter-modal-content">
        <button
          type="button"
          className="btn-close-filter-modal"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="bi bi-x"></i>
        </button>
        <form className="filter-form">
          <h1>Filtrage</h1>
          <div className="mb-3">
            <label htmlFor="enseignant" className="form-label">
              Enseignant
            </label>
            <input
              type="text"
              className="form-control"
              id="enseignant"
              placeholder="Nom de l'enseignant"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
            />
          </div>
          <div className="filter-form-group">
            <label htmlFor="etudiant" className="form-label">
              Étudiant
            </label>
            <input
              type="text"
              className="form-control"
              id="etudiant"
              placeholder="Nom de l'étudiant"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
            />
          </div>
          <div className="shared-form-group">
            <div className="form-group">
              <label>Cours</label>
              <div className="select-group">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
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
                <i className="bi bi-chevron-down"></i>
              </div>
            </div>
            <div className="form-group">
              <label>Session</label>
              <div className="select-group">
                <select
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
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

                      if (i === 0 && semester === currentSemester) {
                        sessions.push(
                          <option
                            key={`${semester} ${year}`}
                            value={`${semester} ${year}`}
                          >
                            {semester} {year}
                          </option>
                        );
                      } else {
                        sessions.push(
                          <option
                            key={`${semester} ${year}`}
                            value={`${semester} ${year}`}
                          >
                            {semester} {year}
                          </option>
                        );
                      }
                    }

                    return sessions;
                  })()}
                  <option value="">Aucune</option>
                </select>
                <i className="bi bi-chevron-down"></i>
              </div>
            </div>
          </div>
          <div className="filter-modal-btn-holder">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Chargement..." : "Confirmer"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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
