export function renderProject(project) {
    const div = document.createElement('div');
    div.classList.add('project-list');

    const p = document.createElement('p');
    p.classList.add('project-description');

    p.textContent = `${project.genre}`;

    div.append(p);

    return div;
}