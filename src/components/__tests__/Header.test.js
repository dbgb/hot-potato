import React from "react";
import { render } from "@testing-library/react";
import { useStaticQuery } from "gatsby";
import Header from "../Header";

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    // Mocked from GraphQL query return data
    return {
      file: {
        childImageSharp: {
          fixed: {
            base64:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAADbUlEQVQ4y51UaUxTQRCe93oJtShWohSKCUSQQyseEEQREIIcmkCwpaggIocFxB8aFCWejYkCKlZAUUSNaKgXaiyRqhgTfxADMd6/PBL9YVSi0aCvfTtuCzVPBVOdZLK7szPfm2/2zQC4KZtXJLi27O93kyaMddgY+A8RgkVQjaHqI7D9E6hkeI1Xenn0p8eG2bWJGj5yqmqA2uoF9yOLWPQzGSYrQeM6xM0ODcDOfYVorc3Hu4dL8W5zOVatTESamtmdrIQUsicrpO+aiuPQYtRxF7driaWukFhqC/h7piJOnxyJ1CfLHTClh0xiXZ4yG8/WLMOrO7X2tnVJeMWYS243lpHrtQVorVvFHavWIctAy6hgxUujnIBSsej6XkMa9h5Zy/U0GvibJgPeMq0lN6l21a0m1/asIPeOrbcdMiShhIX2oXoJ3i5sErCIjCu7BZnx07H3aJm9Y2sWsTaU4q3DBtK+IY2Yt2TSczG5uEOHnZvTvudF+TooVwvBBPWSjRneVGzUxmBv63rbjYMlzmysDSVOuu0bUklX/Ro8UxHP7c4IQtV42Xvqrxrp/9qSGQ7PyubBC38lvNbOUWGXUUe6KcXOXTlIAUlPUzle3qUnbYVzuarkKejnPeYzjUv4I7NxHnDCUgSIBynr7inYd8YXI9WexKSLwJMVCcRMaXdQqqcqF/EtKzXcmnl+KJeJHtHQkGEIkQtLpZDA2f0ZgP2VYPvUqLC/vjGDx0fh/LYiL4z2n0AOZIdgU04oac4J4+uzgnHJdB9HzS5Q9fwdzCF7FFJ4qvYCm1kPZPBaMPnQF0cGH0QRfBxKqgvGotrbw5Ya7oMpVIN8PD862lsQ7wSTS+kyXzVUPxHL7O9Ip3TNgfYvn/IIGcgm+GYxwVextuft/o5sDlCdRTV9pP5lf+1iZlqZhoJtYvHlnUTyuSeaHzgXyD9sDULs9OXOF4ocgLnCCJmYYUdtCV85nH6SD/itSvL9q3Ech5sAyyMBLy2HQTQBpgTDW/pRbwE95m9j5XhNNOBgJeC7UvooesC8CHhBY+53FzFYEgMc9UkdbRaO1LBxagXsi1WBZYEfWOVSxkjNek8J9Ad4wRW61wz7OcHU4/9jik5TgpIuAa6zXOpGZsIprJkIIqRld2i4EsSui5qFwMrEQ2C5M90D+wGWMltS7Vow2AAAAABJRU5ErkJggg==",
            aspectRatio: 1,
            src:
              "/static/364f37460aab084bac138ac697e2a793/8ba1e/hot-potato.png",
            srcSet:
              "/static/364f37460aab084bac138ac697e2a793/8ba1e/hot-potato.png 1x,\n/static/364f37460aab084bac138ac697e2a793/f937a/hot-potato.png 1.5x,\n/static/364f37460aab084bac138ac697e2a793/71eb7/hot-potato.png 2x",
          },
        },
      },
    };
  });
});

test("Renders title correctly", async () => {
  const { getByText } = render(<Header title="Hot Potato!" />);
  expect(getByText("Hot Potato!"));
});
