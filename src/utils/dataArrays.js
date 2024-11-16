import {
  DashboardIcon,
  CustomersIcon,
  FaceBookIcon,
  InstagramIcon,
  YoutubeIcon,
  XIcon,
  ReportIcon,
  PetIcon,
} from "./icons";
import volunteerImage from "../assets/images/applications/volunteer.jpg";
import reportAnimals from "../assets/images/samples/pexels-hson-4335585.jpg";
import blog from "../assets/images/samples/pexels-nantenaina-andrianjaka-1495506-8537645.jpg";
import pet from "../assets/images/samples/pexels-carlota-fernandez-116279705-9771422.jpg";

export const navigationButtons = [
  {
    title: "Home",
    link: "/",
    children: [],
  },
  {
    title: "About Us",
    link: "/about-us",
    children: [],
  },
  {
    title: "Adopt a Pet",
    link: "/adopt-a-pet",
    children: [],
  },
  {
    title: "Blogs",
    link: "/blogs",
    children: [],
  },
];

export const SocialButtons = [
  {
    title: "Facebook",
    icon: FaceBookIcon,
    link: "#",
  },
  {
    title: "Instagram",
    icon: InstagramIcon,
    link: "#",
  },
  {
    title: "Youtube",
    icon: YoutubeIcon,
    link: "#",
  },
  {
    title: "X",
    icon: XIcon,
    link: "#",
  },
];

export const howDoWeOperate = [
  {
    step: "01",
    text: "When you see an animal in distress, use our platform to share the location and details. Your report will be instantly sent to nearby rescue teams and volunteers.",
  },
  {
    step: "02",
    text: "Our dedicated network of animal welfare organizations and volunteers mobilizes quickly to provide the necessary assistance, whether it’s rescue, medical aid, or shelter.",
  },
  {
    step: "03",
    text: "Once safe, animals are placed into foster care or adoption programs. We also provide ongoing support and resources to ensure their well-being and a better future.",
  },
];

export const applications = [
  {
    image: volunteerImage,
    title: "Volunteer Network",
    description:
      "Become a part of our dedicated volunteer network. Assist with rescues, fostering, transportation, and more. Your time and effort can make a significant difference in the lives of street animals.",
    buttonText: "Register",
  },
  {
    image: reportAnimals,
    title: "Report Animals",
    description:
      "Help us locate and rescue animals in need. Share precise locations and details of animals in distress, enabling our teams to respond quickly and effectively.",
    buttonText: "Report Now",
  },
  {
    image: blog,
    title: "Blog",
    description:
      "Read our informative articles and resources on animal welfare, responsible pet ownership, and advocacy. Stay updated with the latest news and tips to better care for and support animals.",
    buttonText: "Stay Informed",
  },
  {
    image: pet,
    title: "Pet Adoption",
    description:
      "Explore our database of animals available for adoption. With detailed profiles and filtering options, finding your perfect furry friend has never been easier. Give a street animal a loving home today.",
    buttonText: "Find Your Companion",
  },
];

export const visions = [
  {
    image: volunteerImage,
    title: "Kindness",
    description:
      "We believe in going above and beyond to give every animal the care and kindness they deserve.",
  },
  {
    image: volunteerImage,
    title: "Empathy",
    description:
      "We believe in going above and beyond to give every animal the care and kindness they deserve.",
  },
  {
    image: volunteerImage,
    title: "Protection",
    description:
      "We believe in going above and beyond to give every animal the care and kindness they deserve.",
  },
  {
    image: volunteerImage,
    title: "Volunteer",
    description:
      "We believe in going above and beyond to give every animal the care and kindness they deserve.",
  },
];

export const recentBlogsCard = [
  {
    image: volunteerImage,
    category: "Animal Health",
    title: "Animal Rescue After Hurricane Ian",
    date: "January 8, 2024",
  },
  {
    image: volunteerImage,
    category: "Success Stories",
    title: "How to Donate to Help Animals in Ukraine",
    date: "January 8, 2024",
  },
  {
    image: volunteerImage,
    category: "Farm Animals",
    title: "What Can Be Observed in a Veterinary Clinic?",
    date: "January 9, 2024",
  },
  {
    image: volunteerImage,
    category: "Animal Health",
    title: "18 Hundred Puppy Factories Closed This Year",
    date: "January 9, 2024",
  },
];

export const newNavigationItems = [
  {
    title: "Reports",
    link: "organization/reports",
    icon: ReportIcon,
    children: 0,
  },
  {
    title: "Pets",
    link: "organization/pets",
    icon: PetIcon,
    children: 0,
  },
  {
    title: "Blogs",
    link: "organization/blogs",
    icon: CustomersIcon,
    children: 0,
  },
];

export const gender = [
  {
    id: "Mr",
    key: "Mr",
  },
  {
    id: "Mrs",
    key: "Mrs",
  },
  {
    id: "Ms",
    key: "Ms",
  },
];

export const branches = [
  {
    id: 1,
    key: "Klautara",
  },
  {
    id: 2,
    key: "Colombo",
  },
];

export const subPathLinks = {
  "Manage Customers": "/customers",
  "New Customer": "/customer/add",
  "Edit Customer": "/customer/edit",
};
