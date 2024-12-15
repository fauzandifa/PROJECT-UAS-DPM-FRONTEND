import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Global Styles
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingBottom: 0,
  },
  greeting: {
    paddingTop: 25,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
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
    alignItems: "center",
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
    backgroundColor: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 10,
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
    color: "#333",
  },
  userTagline: {
    fontSize: 14,
    color: "#888",
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
});

export default styles;
