export function renderProject(project) {
    const div = document.createElement('div');
    div.classList.add('project-list');

    const p = document.createElement('p');
    p.classList.add('project-description');

    const a = document.createElement('a');
    // a.classList.add('project-list');
    a.href = `./project-detail/?id=${project.id}`;

    p.textContent = `${project.name}`;

    div.append(p);
    a.append(div);

    return a;
}
