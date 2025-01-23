import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Global Styles
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  greeting: {
    paddingTop: 25,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#fff", // Ensure greeting text color is white for consistency
  },
  subGreeting: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  // Navbar Styles
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 60,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  navText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  // Movie List Styles
  movieListContainer: {
    marginBottom: 24,
  },
  listHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    marginBottom: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 14,
    color: "#1e90ff",
  },

  // Movie Item Styles
  movieItem: {
    width: 140,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  movieImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  movieDetails: {
    fontSize: 12,
    color: "#555",
  },
  messageButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  messageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Profile Page Styles
  profileContainer: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 10,
    backgroundColor: "#ffff", // Ensure header background color is blue for consistency
    width: "100%",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5B7B1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000", // Ensure user name text color is white for consistency
  },
  userTagline: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  usernameText: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  menuSection: {
    marginVertical: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 15,
    backgroundColor: "#FDEDEC",
    borderRadius: 10,
    padding: 15,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#E74C3C",
  },

  // Menu Item Styles
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },

  // Header Styles
  header: {
    width: "100%",
    backgroundColor: "#1e90ff", // Ensure header background color is blue
    padding: 20,
    paddingTop: 50,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // Ensure header text color is white
  },
  headersubText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff", // Ensure header text color is white
  },
  // Search Input Styles
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 20,
  },
});

export default styles;
