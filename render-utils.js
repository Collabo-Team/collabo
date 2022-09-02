export function renderProject(project, profile) {
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


    avatar.src = 'https://lhopwipdeoyzrdkhgnll.supabase.co/storage/v1/object/public/files-bucket/profile-images/606718collabo-icon-500.png';


    div.append(p, avatar);
    a.append(div);

    return a;
}
