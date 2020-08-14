<template>
	<header header="Favorite Movie Directory" class="hydrated">
		<nav class="app-header">
			<div class="layout-row align-items-center justify-content-center">
				<div class="logo-wrapper hydrated">
					<img
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAXVBMVEUOFB4A6mT///8AAAALERwOABgABRQABhb6+vtTVlsHtFAA7mUHrU4OABsPABYA52Pc3d0AAA8AAAbX19imp6r09PUeIysKgD4KdjsHsU/DxMaTlJfm5ucUGiMKcDkcwJDzAAABFklEQVR4nO3cvVKDQBSAUQRiUIwY4m/UvP9jpogU4WYcZouV4Dklews+yp3hFgUAAAAAAAAAAAAAAAAAAAAAgyqaNFQPZ5tUuQJ3ZXOu3IXE6jkMvbz+JG7e2i5F+54nsV6XUSx8ikN3t6ez1X17k6L9WGUqbP6q8EGhQoUKFSpUqFChQoUKFSpUqFChQoUK519Yjyi8usJJFCpUqFChQoUKFSpUqFChQoWzLwyPLn2Fqy6stiOLu6dZ/k3UP7gvVahQoUKFChUqVKhQoUKFChUqVKhQocJYGN99Wf/jF9U+rEvYh8L+czzUfH0POxUOSSsVuu6QbW3ElL0Y/W97MR7T5AoEAAAAAAAAAAAAAAAAAAAAmLUjSkxXL4VH7TgAAAAASUVORK5CYII="
						class="logo"
					/>
				</div>
				<h4 id="app-title" class="app-title ml-16 my-0">
					Favorite Movie Directory
				</h4>
			</div>
		</nav>
	</header>
</template>

<script>
export default {
	name: "H8kNavbarHead",
};
</script>

<style scoped>
.logo-wrapper {
	height: 44px;
	line-height: 44px;
}
</style>
