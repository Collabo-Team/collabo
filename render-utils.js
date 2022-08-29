export function renderProject(project) {
    const div = document.createElement('div');
    div.classList.add('project-list');

    const p = document.createElement('p');
    p.classList.add('project-description');

    const a = document.createElement('a');
    a.href = `./project-detail/?id=${project.id}`;

    p.textContent = `${project.genre}`;

    a.append(div, p);

    return a;
}