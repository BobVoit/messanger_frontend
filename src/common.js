import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

// список ссылок для меню навигации (MenuNavigation)
export const navigationLinks = [
    {
        title: "Профиль",
        icon: <PersonIcon />,
        link: "/profile"
    },
    {
        title: "Друзья",
        icon: <PeopleIcon />,
        link: "/friends"
    },
    {
        title: "Диалоги",
        icon: <ChatIcon />,
        link: "/dialogs"
    },
    {
        title: "Люди",
        icon: <SupervisorAccountIcon />,
        link: "/users"
    }
]