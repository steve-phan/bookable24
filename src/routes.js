import HomeWorkTwoToneIcon from "@material-ui/icons/HomeWorkTwoTone"
import AboutIcon from "@material-ui/icons/PeopleOutline"
import MenuIcon from "@material-ui/icons/MenuBook"
import ContactIcon from "@material-ui/icons/ContactPhone"

const routes = [
  {
    path: "/",
    name: "Home",
    icon: HomeWorkTwoToneIcon,
  },
  {
    path: "/services",
    name: "Services",
    icon: MenuIcon,
  },

  {
    path: "/about",
    name: "About",
    icon: AboutIcon,
  },

  {
    path: "/contact",
    name: "Contact",
    icon: ContactIcon,
  },

  {
    path: "/blog",
    name: "Blog",
    icon: AboutIcon,
  },
]

export { routes }
