export function renderProject(project) {
    const div = document.createElement('div');
    div.classList.add('project-list');

    const p = document.createElement('p');
    p.classList.add('project-description');

    const a = document.createElement('a');
    // a.classList.add('project-list');
    a.href = `./project-detail/?id=${project.id}`;
    p.textContent = `${project.name}`;

    const avatar = document.createElement('img');
    avatar.classList.add('avatar');


    avatar.src = '';

    div.append(p, avatar);
    a.append(div);

    return a;
}
