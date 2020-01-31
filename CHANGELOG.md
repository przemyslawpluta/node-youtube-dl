## <small>3.0.2 (2020-01-31)</small>

* fix: don't fail on videos when ytdl returns filesize null ([8f6235b](https://github.com/przemyslawpluta/node-youtube-dl/commit/8f6235b))



## <small>3.0.1 (2020-01-16)</small>

* fix: args check ([504419b](https://github.com/przemyslawpluta/node-youtube-dl/commit/504419b))
* Add proxy support ([32b358b](https://github.com/przemyslawpluta/node-youtube-dl/commit/32b358b))
* Drop node8 support ([dd3d7ee](https://github.com/przemyslawpluta/node-youtube-dl/commit/dd3d7ee))



## 3.0.0 (2020-01-13)

* ci: drop node8 support ([333fb7a](https://github.com/przemyslawpluta/node-youtube-dl/commit/333fb7a))
* always add range header on data request ([4bd8904](https://github.com/przemyslawpluta/node-youtube-dl/commit/4bd8904))
* test: adding download large audio ([871382f](https://github.com/przemyslawpluta/node-youtube-dl/commit/871382f))
* test: fix failure due to latest server data ([4f5e44b](https://github.com/przemyslawpluta/node-youtube-dl/commit/4f5e44b))



## 2.3.0 (2019-12-15)

* Update get-binary.js ([b98425a](https://github.com/przemyslawpluta/node-youtube-dl/commit/b98425a))
* refactor: log warning instead of an error if the binary is not found ([1ecca38](https://github.com/przemyslawpluta/node-youtube-dl/commit/1ecca38))
* refactor: only log missing binary error if debug is enabled ([3535e36](https://github.com/przemyslawpluta/node-youtube-dl/commit/3535e36))
* fix: log error if the youtube-dl binary does not exist ([1898e8c](https://github.com/przemyslawpluta/node-youtube-dl/commit/1898e8c))



## 2.2.0 (2019-12-12)

* Update downloader.js ([952826a](https://github.com/przemyslawpluta/node-youtube-dl/commit/952826a))
* Update README.md ([341882f](https://github.com/przemyslawpluta/node-youtube-dl/commit/341882f))
* fix: access to download binary from mirror sites ([7751e65](https://github.com/przemyslawpluta/node-youtube-dl/commit/7751e65))



<a name="2.1.0"></a>
# 2.1.0 (2019-10-29)

* build: add execa dependency ([ffddb6f](https://github.com/przemyslawpluta/node-youtube-dl/commit/ffddb6f))
* build: update contributors ([00dcf5e](https://github.com/przemyslawpluta/node-youtube-dl/commit/00dcf5e))
* fix: avoid destructure under error ([8fb0e20](https://github.com/przemyslawpluta/node-youtube-dl/commit/8fb0e20))
* Add a timeout to close connection if its idle. ([51963bd](https://github.com/przemyslawpluta/node-youtube-dl/commit/51963bd))
* Update youtube-dl.js ([9195b44](https://github.com/przemyslawpluta/node-youtube-dl/commit/9195b44))



<a name="2.0.2"></a>
## 2.0.2 (2019-10-25)

* fix: add access to ChildProcess from outside ([0c10ce5](https://github.com/przemyslawpluta/node-youtube-dl/commit/0c10ce5))
* docs: Add undocumented getYtdlBinary & setYtdlBinary functions ([3e91ebf](https://github.com/przemyslawpluta/node-youtube-dl/commit/3e91ebf))
* docs: normalize youtubedl require statements and remove semicolons ([28373a0](https://github.com/przemyslawpluta/node-youtube-dl/commit/28373a0))



<a name="2.0.1"></a>
## 2.0.1 (2019-08-10)

* build: migrate lint-staged ([eb0531a](https://github.com/przemyslawpluta/node-youtube-dl/commit/eb0531a))
* build: use youtube-dl ([aded2ce](https://github.com/przemyslawpluta/node-youtube-dl/commit/aded2ce))
* refactor: tweaks ([5e2cc08](https://github.com/przemyslawpluta/node-youtube-dl/commit/5e2cc08))
* fix: extract into a module ([1125b0e](https://github.com/przemyslawpluta/node-youtube-dl/commit/1125b0e))
* test: ensure format is mp4 ([9e44925](https://github.com/przemyslawpluta/node-youtube-dl/commit/9e44925))



<a name="2.0.0"></a>
# 2.0.0 (2019-05-22)

* build: be possible setup downloader for windows ([8111957](https://github.com/przemyslawpluta/node-youtube-dl/commit/8111957))
* build: improve workflow ([5ce37dd](https://github.com/przemyslawpluta/node-youtube-dl/commit/5ce37dd))
* build: improve workflow ([9ff909e](https://github.com/przemyslawpluta/node-youtube-dl/commit/9ff909e))
* build: setup node version ([41f0a80](https://github.com/przemyslawpluta/node-youtube-dl/commit/41f0a80))
* build: setup properly release message ([8f7a11b](https://github.com/przemyslawpluta/node-youtube-dl/commit/8f7a11b))
* build: take end on consideration ([66e1324](https://github.com/przemyslawpluta/node-youtube-dl/commit/66e1324))
* refactor: remove dead code ([1a74f06](https://github.com/przemyslawpluta/node-youtube-dl/commit/1a74f06))



<a name="1.13.5"></a>
## 1.13.5 (2019-05-22)

* Fix non-json outputs ([cfff104](https://github.com/przemyslawpluta/node-youtube-dl/commit/cfff104))
* Fix typo in comments ([e968072](https://github.com/przemyslawpluta/node-youtube-dl/commit/e968072))
* New has() method that replaces arr.indexOf where applicable ([5ec1f87](https://github.com/przemyslawpluta/node-youtube-dl/commit/5ec1f87))
* Removed package-lock.json ([56cbc63](https://github.com/przemyslawpluta/node-youtube-dl/commit/56cbc63))
* Replace typeof === "string" with util.isString globally ([e3f4a9d](https://github.com/przemyslawpluta/node-youtube-dl/commit/e3f4a9d))
* Fix: Checking if we have args before testing them ([113ed2a](https://github.com/przemyslawpluta/node-youtube-dl/commit/113ed2a))



<a name="1.13.4"></a>
## 1.13.4 (2019-05-18)

* ci: update builds ([3977c65](https://github.com/przemyslawpluta/node-youtube-dl/commit/3977c65))
* Update youtube-dl.js ([bfc0a1d](https://github.com/przemyslawpluta/node-youtube-dl/commit/bfc0a1d))



<a name="1.13.3"></a>
## 1.13.3 (2019-05-16)

* test: update ([fd31af8](https://github.com/przemyslawpluta/node-youtube-dl/commit/fd31af8))
* fix: fix a regression caused by previous refactorings ([dfed31a](https://github.com/przemyslawpluta/node-youtube-dl/commit/dfed31a)), closes [#230](https://github.com/przemyslawpluta/node-youtube-dl/issues/230)
* Enable option to select subtitle formats ([4bc1caa](https://github.com/przemyslawpluta/node-youtube-dl/commit/4bc1caa))



<a name="1.13.2"></a>
## 1.13.2 (2019-03-29)

* Send header because gets 403 if cookie is needed ([91f3f69](https://github.com/przemyslawpluta/node-youtube-dl/commit/91f3f69))



<a name="1.13.1"></a>
## 1.13.1 (2019-02-04)

* Fixed typo & removed redundant line ([156bbd5](https://github.com/przemyslawpluta/node-youtube-dl/commit/156bbd5))



<a name="1.13.0"></a>
# 1.13.0 (2019-01-25)

* build: add release process ([8cc1b05](https://github.com/przemyslawpluta/node-youtube-dl/commit/8cc1b05))
* test: update snapshots ([65fb75e](https://github.com/przemyslawpluta/node-youtube-dl/commit/65fb75e))
* add editorconfig ([8a92f0b](https://github.com/przemyslawpluta/node-youtube-dl/commit/8a92f0b))
* add hms to duration, twitch test ([9ea3ff1](https://github.com/przemyslawpluta/node-youtube-dl/commit/9ea3ff1))
* add sensible `execFile` good defaults ([2524d75](https://github.com/przemyslawpluta/node-youtube-dl/commit/2524d75)), closes [#173](https://github.com/przemyslawpluta/node-youtube-dl/issues/173)
* Adding dashes before the video ID ([da8f4dd](https://github.com/przemyslawpluta/node-youtube-dl/commit/da8f4dd))
* changed to _filename in line 33 readme ([87d3891](https://github.com/przemyslawpluta/node-youtube-dl/commit/87d3891))
* Consider copyright videos as not available in order to continue on error ([e19d8d1](https://github.com/przemyslawpluta/node-youtube-dl/commit/e19d8d1))
* Consider not made available videos as not available in order to continue on error ([ae7ea3b](https://github.com/przemyslawpluta/node-youtube-dl/commit/ae7ea3b))
* Correct extension in playlist.js ([5d77436](https://github.com/przemyslawpluta/node-youtube-dl/commit/5d77436))
* Correct test with correct video info ([0ee2609](https://github.com/przemyslawpluta/node-youtube-dl/commit/0ee2609))
* Disable non-functional test ([ca1aa42](https://github.com/przemyslawpluta/node-youtube-dl/commit/ca1aa42))
* download best and combine is ffmpeg available ([2193220](https://github.com/przemyslawpluta/node-youtube-dl/commit/2193220))
* Download correct binary for windows systems ([3874a88](https://github.com/przemyslawpluta/node-youtube-dl/commit/3874a88))
* drop tests for 4,5 and version bump ([3634c67](https://github.com/przemyslawpluta/node-youtube-dl/commit/3634c67))
* Fix encoding issue on windows ([d65114d](https://github.com/przemyslawpluta/node-youtube-dl/commit/d65114d))
* Get and set path from youtube-dl ([161ed2a](https://github.com/przemyslawpluta/node-youtube-dl/commit/161ed2a))
* handle thumbnails download ([a0832dc](https://github.com/przemyslawpluta/node-youtube-dl/commit/a0832dc))
* hms and raw duration ([eb0e9de](https://github.com/przemyslawpluta/node-youtube-dl/commit/eb0e9de))
* meta tweaks ([f685ad7](https://github.com/przemyslawpluta/node-youtube-dl/commit/f685ad7))
* minor typo ([429b1f7](https://github.com/przemyslawpluta/node-youtube-dl/commit/429b1f7))
* missing ; ([05f8f62](https://github.com/przemyslawpluta/node-youtube-dl/commit/05f8f62))
* remove dead code ([4b1ba39](https://github.com/przemyslawpluta/node-youtube-dl/commit/4b1ba39))
* remove deprecated badge ([19a7b33](https://github.com/przemyslawpluta/node-youtube-dl/commit/19a7b33))
* remove lock ([0131daf](https://github.com/przemyslawpluta/node-youtube-dl/commit/0131daf))
* Remove size from download test, not relevant ([e22ee14](https://github.com/przemyslawpluta/node-youtube-dl/commit/e22ee14))
* remove vimeo tests ([1f717cc](https://github.com/przemyslawpluta/node-youtube-dl/commit/1f717cc))
* update dependencies ([bf28967](https://github.com/przemyslawpluta/node-youtube-dl/commit/bf28967))
* update snapshot ([70ec50a](https://github.com/przemyslawpluta/node-youtube-dl/commit/70ec50a))
* Update test about twitch (twitch id are not anymore the video title) ([b9f0317](https://github.com/przemyslawpluta/node-youtube-dl/commit/b9f0317))
* update travis builds ([efe313c](https://github.com/przemyslawpluta/node-youtube-dl/commit/efe313c))
* Updated test case since video title changed on twitch's end ([7c22361](https://github.com/przemyslawpluta/node-youtube-dl/commit/7c22361))
* use const over var ([6ed5a1c](https://github.com/przemyslawpluta/node-youtube-dl/commit/6ed5a1c))



<a name="1.12.1"></a>
## 1.12.1 (2017-09-28)

* cleanup ([68ea1df](https://github.com/przemyslawpluta/node-youtube-dl/commit/68ea1df))
* cleanup ([5efbce3](https://github.com/przemyslawpluta/node-youtube-dl/commit/5efbce3))
* concat args ([25ed267](https://github.com/przemyslawpluta/node-youtube-dl/commit/25ed267))
* correct repo url ([88ec7c8](https://github.com/przemyslawpluta/node-youtube-dl/commit/88ec7c8))
* Document how to increase buffer size ([3bb3e4d](https://github.com/przemyslawpluta/node-youtube-dl/commit/3bb3e4d))
* drop getFormats, update vimeo test ([da47d4d](https://github.com/przemyslawpluta/node-youtube-dl/commit/da47d4d))
* drop io.js tests ([b1fa4fb](https://github.com/przemyslawpluta/node-youtube-dl/commit/b1fa4fb))
* drop soundcloud due to ssl error on travis ([0c7168d](https://github.com/przemyslawpluta/node-youtube-dl/commit/0c7168d))
* drop tests for 0.10 ([473cdf6](https://github.com/przemyslawpluta/node-youtube-dl/commit/473cdf6))
* fix ([a6d6d36](https://github.com/przemyslawpluta/node-youtube-dl/commit/a6d6d36))
* Fix issue with duration not formatting correctly ([d9dd0ec](https://github.com/przemyslawpluta/node-youtube-dl/commit/d9dd0ec))
* fix package name ([5642547](https://github.com/przemyslawpluta/node-youtube-dl/commit/5642547))
* fix tests, update formatting ([796f922](https://github.com/przemyslawpluta/node-youtube-dl/commit/796f922))
* fixed downloader if user passed in a custom bin dir ([2954eed](https://github.com/przemyslawpluta/node-youtube-dl/commit/2954eed))
* Fixed tests assertion, video sizes changed probably due to change in streaming technology and title  ([d2f7894](https://github.com/przemyslawpluta/node-youtube-dl/commit/d2f7894))
* hotfix for the electron issue ([ae7608c](https://github.com/przemyslawpluta/node-youtube-dl/commit/ae7608c))
* Make properties configurable ([dab402b](https://github.com/przemyslawpluta/node-youtube-dl/commit/dab402b))
* manage missing video array plus tests ([6f2840e](https://github.com/przemyslawpluta/node-youtube-dl/commit/6f2840e))
* py + node test ([cf2d5e1](https://github.com/przemyslawpluta/node-youtube-dl/commit/cf2d5e1))
* python test ([e6b597a](https://github.com/przemyslawpluta/node-youtube-dl/commit/e6b597a))
* Quickfix for Copy Error in Usage Example ([db27e8a](https://github.com/przemyslawpluta/node-youtube-dl/commit/db27e8a))
* skip error is video has been removed by the user ([5e94b13](https://github.com/przemyslawpluta/node-youtube-dl/commit/5e94b13))
* skip error is video has been removed by the user ([956056b](https://github.com/przemyslawpluta/node-youtube-dl/commit/956056b))
* ssl err test ([0738a25](https://github.com/przemyslawpluta/node-youtube-dl/commit/0738a25))
* test ([80d924a](https://github.com/przemyslawpluta/node-youtube-dl/commit/80d924a))
* travis ssl force ([6b0f0f8](https://github.com/przemyslawpluta/node-youtube-dl/commit/6b0f0f8))
* update audio.js ([17c3fb1](https://github.com/przemyslawpluta/node-youtube-dl/commit/17c3fb1))
* update build status ([1aa9d82](https://github.com/przemyslawpluta/node-youtube-dl/commit/1aa9d82))
* update details ([653f411](https://github.com/przemyslawpluta/node-youtube-dl/commit/653f411))
* update icons ([0399db6](https://github.com/przemyslawpluta/node-youtube-dl/commit/0399db6))
* update mode ([e83b336](https://github.com/przemyslawpluta/node-youtube-dl/commit/e83b336))
* update package ([2867fc5](https://github.com/przemyslawpluta/node-youtube-dl/commit/2867fc5))
* Update README.md ([76cb708](https://github.com/przemyslawpluta/node-youtube-dl/commit/76cb708))
* update tests ([d745285](https://github.com/przemyslawpluta/node-youtube-dl/commit/d745285))
* update travis env ([08fd355](https://github.com/przemyslawpluta/node-youtube-dl/commit/08fd355))
* update travis-ci ([339460b](https://github.com/przemyslawpluta/node-youtube-dl/commit/339460b))
* update youtube-dl permissions ([621b478](https://github.com/przemyslawpluta/node-youtube-dl/commit/621b478))
* updates & fixes ([8bc4839](https://github.com/przemyslawpluta/node-youtube-dl/commit/8bc4839))
* version bump ([a839a5f](https://github.com/przemyslawpluta/node-youtube-dl/commit/a839a5f))



<a name="1.11.1"></a>
## 1.11.1 (2016-04-06)

* add heroku support ([541e710](https://github.com/przemyslawpluta/node-youtube-dl/commit/541e710))
* version bump ([22abe25](https://github.com/przemyslawpluta/node-youtube-dl/commit/22abe25))



<a name="1.11.0"></a>
# 1.11.0 (2016-03-25)

* add getFormats example ([d9b2925](https://github.com/przemyslawpluta/node-youtube-dl/commit/d9b2925))
* add node 4 & 5 for testing ([8683ac1](https://github.com/przemyslawpluta/node-youtube-dl/commit/8683ac1))
* adding ability to continue partially downloaded files. ([e9e540a](https://github.com/przemyslawpluta/node-youtube-dl/commit/e9e540a))
* allow for external bin but keep details internally ([f35daab](https://github.com/przemyslawpluta/node-youtube-dl/commit/f35daab))
* As requested, I was trying to make the code as readable as possible ([38884d1](https://github.com/przemyslawpluta/node-youtube-dl/commit/38884d1))
* callback err ([f49128c](https://github.com/przemyslawpluta/node-youtube-dl/commit/f49128c))
* change bin permissions ([957172b](https://github.com/przemyslawpluta/node-youtube-dl/commit/957172b))
* check for datadir existence ([1817160](https://github.com/przemyslawpluta/node-youtube-dl/commit/1817160))
* choose bin location ([1123d33](https://github.com/przemyslawpluta/node-youtube-dl/commit/1123d33))
* cleanup ([12eb585](https://github.com/przemyslawpluta/node-youtube-dl/commit/12eb585))
* cleanup ([1a8b2f0](https://github.com/przemyslawpluta/node-youtube-dl/commit/1a8b2f0))
* cleanup .gitignore ([bf5b974](https://github.com/przemyslawpluta/node-youtube-dl/commit/bf5b974))
* dependencies bump ([f131dca](https://github.com/przemyslawpluta/node-youtube-dl/commit/f131dca))
* document `ytdl.exec()` with audio example ([2b8333f](https://github.com/przemyslawpluta/node-youtube-dl/commit/2b8333f))
* extract downloader ([f27c45a](https://github.com/przemyslawpluta/node-youtube-dl/commit/f27c45a))
* fix bin path ([6f9ef39](https://github.com/przemyslawpluta/node-youtube-dl/commit/6f9ef39))
* fix license meta in pacakge.json ([3d2f168](https://github.com/przemyslawpluta/node-youtube-dl/commit/3d2f168))
* fix resolution or audio ([d2a3269](https://github.com/przemyslawpluta/node-youtube-dl/commit/d2a3269))
* handle playlists ([acb1571](https://github.com/przemyslawpluta/node-youtube-dl/commit/acb1571))
* install module before download ([f3e0ac7](https://github.com/przemyslawpluta/node-youtube-dl/commit/f3e0ac7))
* missing dependency ([f56cb24](https://github.com/przemyslawpluta/node-youtube-dl/commit/f56cb24))
* move bin path to datadir ([7ef58ef](https://github.com/przemyslawpluta/node-youtube-dl/commit/7ef58ef))
* no longer maintaining ([1aa9076](https://github.com/przemyslawpluta/node-youtube-dl/commit/1aa9076))
* package postinstall ([c1f052f](https://github.com/przemyslawpluta/node-youtube-dl/commit/c1f052f))
* permission change on bin ([c061caa](https://github.com/przemyslawpluta/node-youtube-dl/commit/c061caa))
* permission change on bin cleanup test ([6912150](https://github.com/przemyslawpluta/node-youtube-dl/commit/6912150))
* preventing options being created if it doesn't exist ([894e215](https://github.com/przemyslawpluta/node-youtube-dl/commit/894e215))
* remove unused module ([6fc3f02](https://github.com/przemyslawpluta/node-youtube-dl/commit/6fc3f02))
* resolve to .exe on win ([2c5467e](https://github.com/przemyslawpluta/node-youtube-dl/commit/2c5467e))
* skip over not available videos during playlist download ([45ee26b](https://github.com/przemyslawpluta/node-youtube-dl/commit/45ee26b))
* store example videos in dir to keep things cleaner ([e7cc0d5](https://github.com/przemyslawpluta/node-youtube-dl/commit/e7cc0d5))
* update ([4da180b](https://github.com/przemyslawpluta/node-youtube-dl/commit/4da180b))
* update ([60a0cf4](https://github.com/przemyslawpluta/node-youtube-dl/commit/60a0cf4))
* update path ([b9992cf](https://github.com/przemyslawpluta/node-youtube-dl/commit/b9992cf))
* update readme ([c159427](https://github.com/przemyslawpluta/node-youtube-dl/commit/c159427))
* update readme ([a41b965](https://github.com/przemyslawpluta/node-youtube-dl/commit/a41b965))
* update README ([1565229](https://github.com/przemyslawpluta/node-youtube-dl/commit/1565229))
* update tests ([7be149d](https://github.com/przemyslawpluta/node-youtube-dl/commit/7be149d))
* Updating comment block for inline quotes, replacing double quotes with single quotes ([1646cec](https://github.com/przemyslawpluta/node-youtube-dl/commit/1646cec))



<a name="1.10.5"></a>
## 1.10.5 (2015-05-07)

* 1.10.5 ([d2d4eba](https://github.com/przemyslawpluta/node-youtube-dl/commit/d2d4eba))
* better check for `--format` ([dbaebb3](https://github.com/przemyslawpluta/node-youtube-dl/commit/dbaebb3))



<a name="1.10.4"></a>
## 1.10.4 (2015-05-07)

* 1.10.4 ([06ec68e](https://github.com/przemyslawpluta/node-youtube-dl/commit/06ec68e))
* check for `--format` too ([08ca167](https://github.com/przemyslawpluta/node-youtube-dl/commit/08ca167))
* Specify download format 'best' if none supplied ([edee4d3](https://github.com/przemyslawpluta/node-youtube-dl/commit/edee4d3))
* update examples ([023a502](https://github.com/przemyslawpluta/node-youtube-dl/commit/023a502))
* update tests ([a85779d](https://github.com/przemyslawpluta/node-youtube-dl/commit/a85779d))



<a name="1.10.3"></a>
## 1.10.3 (2015-04-19)

* 1.10.3 ([a70895e](https://github.com/przemyslawpluta/node-youtube-dl/commit/a70895e))
* Fix the broken Host HTTP Header for Dailymotion && Fix Test ([9657b8c](https://github.com/przemyslawpluta/node-youtube-dl/commit/9657b8c))



<a name="1.10.2"></a>
## 1.10.2 (2015-03-24)

* 1.10.2 ([484d1c3](https://github.com/przemyslawpluta/node-youtube-dl/commit/484d1c3))
* a bit of docs ([c3c1b4b](https://github.com/przemyslawpluta/node-youtube-dl/commit/c3c1b4b))
* print warning when getting warnings from stderr ([26bd213](https://github.com/przemyslawpluta/node-youtube-dl/commit/26bd213))



<a name="1.10.1"></a>
## 1.10.1 (2015-02-26)

* 1.10.1 ([498e288](https://github.com/przemyslawpluta/node-youtube-dl/commit/498e288))
* add io.js and 0.12 to test matrix ([17ce70b](https://github.com/przemyslawpluta/node-youtube-dl/commit/17ce70b))
* call binary with python instead of directly, fixes #66 ([833d281](https://github.com/przemyslawpluta/node-youtube-dl/commit/833d281)), closes [#66](https://github.com/przemyslawpluta/node-youtube-dl/issues/66)
* dont test on node v0.8 ([5c1c182](https://github.com/przemyslawpluta/node-youtube-dl/commit/5c1c182))
* quote iojs ([47d1485](https://github.com/przemyslawpluta/node-youtube-dl/commit/47d1485))
* update packages ([413cf53](https://github.com/przemyslawpluta/node-youtube-dl/commit/413cf53))
* use container based environment ([4947618](https://github.com/przemyslawpluta/node-youtube-dl/commit/4947618))



<a name="1.10.0"></a>
# 1.10.0 (2015-02-19)

* 1.10.0 ([d3018e5](https://github.com/przemyslawpluta/node-youtube-dl/commit/d3018e5))
* Multiple URL support (array param) for getInfo() ([1afab0b](https://github.com/przemyslawpluta/node-youtube-dl/commit/1afab0b))



<a name="1.9.0"></a>
# 1.9.0 (2015-02-13)

* 1.9.0 ([e3be488](https://github.com/przemyslawpluta/node-youtube-dl/commit/e3be488))
* add warnings for using deprecated fields ([d2c53ae](https://github.com/przemyslawpluta/node-youtube-dl/commit/d2c53ae))
* Call getInfo from getFormats ([4ecda89](https://github.com/przemyslawpluta/node-youtube-dl/commit/4ecda89))
* document how to keep youtube-dl binary up to date. fixes #61 ([a8eface](https://github.com/przemyslawpluta/node-youtube-dl/commit/a8eface)), closes [#61](https://github.com/przemyslawpluta/node-youtube-dl/issues/61)
* dont check each individual format object ([50c113f](https://github.com/przemyslawpluta/node-youtube-dl/commit/50c113f))
* fix getting playlist info ([cdb37fe](https://github.com/przemyslawpluta/node-youtube-dl/commit/cdb37fe))
* Move formatDuration to util.js ([c309c24](https://github.com/przemyslawpluta/node-youtube-dl/commit/c309c24))
* remove unused old functions ([e4689a6](https://github.com/przemyslawpluta/node-youtube-dl/commit/e4689a6))
* Return the full info provided by youtube-dl ([ace1b11](https://github.com/przemyslawpluta/node-youtube-dl/commit/ace1b11))
* Use the '--dump-json' option for extracting the video information ([b3a9fcd](https://github.com/przemyslawpluta/node-youtube-dl/commit/b3a9fcd))
* Use the '--dump-json' option for getFormats ([e93a8b9](https://github.com/przemyslawpluta/node-youtube-dl/commit/e93a8b9))



<a name="1.8.0"></a>
# 1.8.0 (2015-01-15)

* 1.8.0 ([ab8b3df](https://github.com/przemyslawpluta/node-youtube-dl/commit/ab8b3df))
* Added extractor API incl. tests and example code ([d2b3983](https://github.com/przemyslawpluta/node-youtube-dl/commit/d2b3983))
* dont download video when downloading subtitles ([3cfa382](https://github.com/przemyslawpluta/node-youtube-dl/commit/3cfa382))
* put try/catch around unlinking subtitle file ([a3f5202](https://github.com/przemyslawpluta/node-youtube-dl/commit/a3f5202))



<a name="1.7.0"></a>
# 1.7.0 (2015-01-08)

* 1.7.0 ([777619e](https://github.com/przemyslawpluta/node-youtube-dl/commit/777619e))
* added more cli args to ignore ([8edbd1e](https://github.com/przemyslawpluta/node-youtube-dl/commit/8edbd1e))
* get duration. fixes #53 ([fd7d7c9](https://github.com/przemyslawpluta/node-youtube-dl/commit/fd7d7c9)), closes [#53](https://github.com/przemyslawpluta/node-youtube-dl/issues/53)
* make `args` passed to youtube-dl actually optional ([413d0ab](https://github.com/przemyslawpluta/node-youtube-dl/commit/413d0ab))



<a name="1.6.0"></a>
# 1.6.0 (2014-11-23)

* 1.6.0 ([8d548eb](https://github.com/przemyslawpluta/node-youtube-dl/commit/8d548eb))
* add `getSubs()` function. fixes #48 ([6cb55af](https://github.com/przemyslawpluta/node-youtube-dl/commit/6cb55af)), closes [#48](https://github.com/przemyslawpluta/node-youtube-dl/issues/48)
* better resolution detection ([cff5763](https://github.com/przemyslawpluta/node-youtube-dl/commit/cff5763))
* check size is defined ([0e67ef1](https://github.com/przemyslawpluta/node-youtube-dl/commit/0e67ef1))
* linting ([916e8da](https://github.com/przemyslawpluta/node-youtube-dl/commit/916e8da))
* linting ([1f5e319](https://github.com/przemyslawpluta/node-youtube-dl/commit/1f5e319))
* update formats returned ([d545f10](https://github.com/przemyslawpluta/node-youtube-dl/commit/d545f10))
* updated getFormats regex to handle unknown & ?x formats ([7e33ace](https://github.com/przemyslawpluta/node-youtube-dl/commit/7e33ace))



<a name="1.5.16"></a>
## 1.5.16 (2014-10-24)

* 1.5.16 ([4acfca7](https://github.com/przemyslawpluta/node-youtube-dl/commit/4acfca7))
* filter out from correct args if no subs ([97346fe](https://github.com/przemyslawpluta/node-youtube-dl/commit/97346fe))
* handle new warning style ([3ae2964](https://github.com/przemyslawpluta/node-youtube-dl/commit/3ae2964))
* update test formats ([24f00e5](https://github.com/przemyslawpluta/node-youtube-dl/commit/24f00e5))



<a name="1.5.15"></a>
## 1.5.15 (2014-09-25)

* 1.5.15 ([f315043](https://github.com/przemyslawpluta/node-youtube-dl/commit/f315043))
* fix ([5d07020](https://github.com/przemyslawpluta/node-youtube-dl/commit/5d07020))



<a name="1.5.14"></a>
## 1.5.14 (2014-09-24)

* 1.5.14 ([c7d7c08](https://github.com/przemyslawpluta/node-youtube-dl/commit/c7d7c08))
* expose call function with empty default args as exec ([e12b538](https://github.com/przemyslawpluta/node-youtube-dl/commit/e12b538))
* ignore any errors after successful download. fixes #43 ([58558d8](https://github.com/przemyslawpluta/node-youtube-dl/commit/58558d8)), closes [#43](https://github.com/przemyslawpluta/node-youtube-dl/issues/43)



<a name="1.5.13"></a>
## 1.5.13 (2014-09-07)

* 1.5.13 ([e72b27d](https://github.com/przemyslawpluta/node-youtube-dl/commit/e72b27d))
* fix for missing env variable in win ([4115b5e](https://github.com/przemyslawpluta/node-youtube-dl/commit/4115b5e))



<a name="1.5.12"></a>
## 1.5.12 (2014-09-04)

* 1.5.12 ([8a8c681](https://github.com/przemyslawpluta/node-youtube-dl/commit/8a8c681))
* fix youtube id filtering ([3cb82a9](https://github.com/przemyslawpluta/node-youtube-dl/commit/3cb82a9))



<a name="1.5.11"></a>
## 1.5.11 (2014-08-24)

* 1.5.11 ([09d2951](https://github.com/przemyslawpluta/node-youtube-dl/commit/09d2951))
* support non-youtube (speificially vimeo) videos. fixes #39 ([cd6938b](https://github.com/przemyslawpluta/node-youtube-dl/commit/cd6938b)), closes [#39](https://github.com/przemyslawpluta/node-youtube-dl/issues/39)



<a name="1.5.10"></a>
## 1.5.10 (2014-08-05)

* 1.5.10 ([f9c0c8f](https://github.com/przemyslawpluta/node-youtube-dl/commit/f9c0c8f))
* fix not passing options ([02fa0df](https://github.com/przemyslawpluta/node-youtube-dl/commit/02fa0df))



<a name="1.5.9"></a>
## 1.5.9 (2014-08-02)

* 1.5.9 ([303fb12](https://github.com/przemyslawpluta/node-youtube-dl/commit/303fb12))
* Add more entries to badArgs ([a6821b5](https://github.com/przemyslawpluta/node-youtube-dl/commit/a6821b5))
* fix for failed download with no subtitles ([36fd75a](https://github.com/przemyslawpluta/node-youtube-dl/commit/36fd75a))
* fix for failed download with no subtitles when requested ([69166bf](https://github.com/przemyslawpluta/node-youtube-dl/commit/69166bf))
* fix for failed download with no subtitles when requested ([aeab2dd](https://github.com/przemyslawpluta/node-youtube-dl/commit/aeab2dd))
* fix for failed download with no subtitles when requested ([038b1fd](https://github.com/przemyslawpluta/node-youtube-dl/commit/038b1fd))
* fix for failed download with no subtitles when requested ([19c13af](https://github.com/przemyslawpluta/node-youtube-dl/commit/19c13af))
* fix for failed download with no subtitles when requested ([82a48a4](https://github.com/przemyslawpluta/node-youtube-dl/commit/82a48a4))
* only notify on build changes ([3cf3363](https://github.com/przemyslawpluta/node-youtube-dl/commit/3cf3363))
* update request to v2.37.0 ([11757f3](https://github.com/przemyslawpluta/node-youtube-dl/commit/11757f3))



<a name="1.5.8"></a>
## 1.5.8 (2014-07-04)

* Fix ReferenceError: onerror is not defined ([acb3512](https://github.com/przemyslawpluta/node-youtube-dl/commit/acb3512))
* Fix var name: from er to err ([21bdbee](https://github.com/przemyslawpluta/node-youtube-dl/commit/21bdbee))
* update request ([f97f90b](https://github.com/przemyslawpluta/node-youtube-dl/commit/f97f90b))
* v1.5.7 ([f19215a](https://github.com/przemyslawpluta/node-youtube-dl/commit/f19215a))
* v1.5.8 ([96083ba](https://github.com/przemyslawpluta/node-youtube-dl/commit/96083ba))



<a name="1.5.6"></a>
## 1.5.6 (2014-06-14)

* comment consistency ([7acea1e](https://github.com/przemyslawpluta/node-youtube-dl/commit/7acea1e))
* fix parsing resolutions ([ac48c37](https://github.com/przemyslawpluta/node-youtube-dl/commit/ac48c37))
* fix when not giving `args` to `getInfo()` ([794617d](https://github.com/przemyslawpluta/node-youtube-dl/commit/794617d))
* v1.5.6 ([80999a5](https://github.com/przemyslawpluta/node-youtube-dl/commit/80999a5))



<a name="1.5.5"></a>
## 1.5.5 (2014-05-02)

* can pass execFile options to download ([2986447](https://github.com/przemyslawpluta/node-youtube-dl/commit/2986447))
* dont parse options twice on download ([67eb88d](https://github.com/przemyslawpluta/node-youtube-dl/commit/67eb88d))
* v1.5.5 ([20c3cd2](https://github.com/przemyslawpluta/node-youtube-dl/commit/20c3cd2))



<a name="1.5.4"></a>
## 1.5.4 (2014-05-01)

* chmod bin directory too ([3d1e88f](https://github.com/przemyslawpluta/node-youtube-dl/commit/3d1e88f))
* run download script on preinstall ([c377b4e](https://github.com/przemyslawpluta/node-youtube-dl/commit/c377b4e))
* update vows ([a3be7a9](https://github.com/przemyslawpluta/node-youtube-dl/commit/a3be7a9))
* v1.5.4 ([a0709a4](https://github.com/przemyslawpluta/node-youtube-dl/commit/a0709a4))
* package: add binary ([2050667](https://github.com/przemyslawpluta/node-youtube-dl/commit/2050667))



<a name="1.5.3"></a>
## 1.5.3 (2014-04-26)

* dont global link youtube-dl binary. too much confusion. ([b74ed8f](https://github.com/przemyslawpluta/node-youtube-dl/commit/b74ed8f))
* Remove /v/ from the id to accept url like http://www.youtube.com/v/6tC1yOUvvMo provided by the youtu ([b4a3350](https://github.com/przemyslawpluta/node-youtube-dl/commit/b4a3350))
* Remove useless g flag from Regex ([1239606](https://github.com/przemyslawpluta/node-youtube-dl/commit/1239606))
* some code organization ([085b9f7](https://github.com/przemyslawpluta/node-youtube-dl/commit/085b9f7))
* update ignore rules ([0acf105](https://github.com/przemyslawpluta/node-youtube-dl/commit/0acf105))
* v1.5.3 ([3175bd0](https://github.com/przemyslawpluta/node-youtube-dl/commit/3175bd0))



<a name="1.5.2"></a>
## 1.5.2 (2014-04-25)

* Add a second var ([76d3468](https://github.com/przemyslawpluta/node-youtube-dl/commit/76d3468))
* Fix "Cannot call method 'split' of undefined" bug with last version of youtube-dl (2014.04.21.6) ([864a526](https://github.com/przemyslawpluta/node-youtube-dl/commit/864a526))
* Remove commented old code ([9804155](https://github.com/przemyslawpluta/node-youtube-dl/commit/9804155))
* Remove the extra space ([11aabf9](https://github.com/przemyslawpluta/node-youtube-dl/commit/11aabf9))
* Save the regexp in the outer scope so it's not compiled every time this function runs ([585c526](https://github.com/przemyslawpluta/node-youtube-dl/commit/585c526))
* v1.5.2 ([88be6d7](https://github.com/przemyslawpluta/node-youtube-dl/commit/88be6d7))



<a name="1.5.1"></a>
## 1.5.1 (2014-04-08)

* add Przemyslaw to contributors ([afc4cc9](https://github.com/przemyslawpluta/node-youtube-dl/commit/afc4cc9))
* fix for win py2.x / py3.x ([472a8db](https://github.com/przemyslawpluta/node-youtube-dl/commit/472a8db))
* v1.5.1 ([7a2620d](https://github.com/przemyslawpluta/node-youtube-dl/commit/7a2620d))



<a name="1.5.0"></a>
# 1.5.0 (2014-04-08)

* download first if array of clips ([28ed6bb](https://github.com/przemyslawpluta/node-youtube-dl/commit/28ed6bb))
* handle videos download from youtube playlist ([b7434da](https://github.com/przemyslawpluta/node-youtube-dl/commit/b7434da))
* refactor ([6c5187e](https://github.com/przemyslawpluta/node-youtube-dl/commit/6c5187e))
* test update ([8704b8e](https://github.com/przemyslawpluta/node-youtube-dl/commit/8704b8e))
* typo ([540ee03](https://github.com/przemyslawpluta/node-youtube-dl/commit/540ee03))
* typo ([2647ed5](https://github.com/przemyslawpluta/node-youtube-dl/commit/2647ed5))
* v1.5.0 ([b27d373](https://github.com/przemyslawpluta/node-youtube-dl/commit/b27d373))



<a name="1.4.0"></a>
# 1.4.0 (2014-03-14)

* not needed ([7dcd88f](https://github.com/przemyslawpluta/node-youtube-dl/commit/7dcd88f))
* reflect api changes ([82aeb41](https://github.com/przemyslawpluta/node-youtube-dl/commit/82aeb41))
* update example videos ([3bd98d7](https://github.com/przemyslawpluta/node-youtube-dl/commit/3bd98d7))
* update tests ([c4ab33d](https://github.com/przemyslawpluta/node-youtube-dl/commit/c4ab33d))
* use youtube-dl to get download url, return stream ([3479e52](https://github.com/przemyslawpluta/node-youtube-dl/commit/3479e52))
* v1.4.0 ([e23e5f3](https://github.com/przemyslawpluta/node-youtube-dl/commit/e23e5f3))



<a name="1.3.6"></a>
## 1.3.6 (2014-02-15)

* fix - youtube-dl incorrect download ([8c439b1](https://github.com/przemyslawpluta/node-youtube-dl/commit/8c439b1))
* v1.3.6 ([be7c22f](https://github.com/przemyslawpluta/node-youtube-dl/commit/be7c22f))



<a name="1.3.5"></a>
## 1.3.5 (2014-02-15)

* Fix - win handling getInfo & getFormats ([19ccc54](https://github.com/przemyslawpluta/node-youtube-dl/commit/19ccc54))
* Fix - win handling getInfo & getFormats ([7655ea1](https://github.com/przemyslawpluta/node-youtube-dl/commit/7655ea1))
* v1.3.5 ([6f4eb9c](https://github.com/przemyslawpluta/node-youtube-dl/commit/6f4eb9c))



<a name="1.3.4"></a>
## 1.3.4 (2014-02-14)

* Fix - Incorrect youtube video URL ([954df15](https://github.com/przemyslawpluta/node-youtube-dl/commit/954df15))
* Fix - Incorrect youtube video URL ([17c4214](https://github.com/przemyslawpluta/node-youtube-dl/commit/17c4214))
* Fix - Incorrect youtube video URL ([12dea04](https://github.com/przemyslawpluta/node-youtube-dl/commit/12dea04))
* Fix - Incorrect youtube video URL ([1b10dff](https://github.com/przemyslawpluta/node-youtube-dl/commit/1b10dff))
* Fix - Incorrect youtube video URL ([408e2b1](https://github.com/przemyslawpluta/node-youtube-dl/commit/408e2b1))
* Fix - Incorrect youtube video URL ([c161fa6](https://github.com/przemyslawpluta/node-youtube-dl/commit/c161fa6))
* Fix - Incorrect youtube video URL ([753ae6b](https://github.com/przemyslawpluta/node-youtube-dl/commit/753ae6b))
* Fix - Incorrect youtube video URL ([04f4aaa](https://github.com/przemyslawpluta/node-youtube-dl/commit/04f4aaa))
* Fix - Incorrect youtube video URL ([a5eeb09](https://github.com/przemyslawpluta/node-youtube-dl/commit/a5eeb09))
* Fix - Incorrect youtube video URL ([28dd461](https://github.com/przemyslawpluta/node-youtube-dl/commit/28dd461))
* only write version to file if downloaded successfully ([091f425](https://github.com/przemyslawpluta/node-youtube-dl/commit/091f425))
* v1.3.4 ([6825c7b](https://github.com/przemyslawpluta/node-youtube-dl/commit/6825c7b))



<a name="1.3.3"></a>
## 1.3.3 (2014-02-12)

* spawn ENOENT in win ([48a309d](https://github.com/przemyslawpluta/node-youtube-dl/commit/48a309d))
* spawn ENOENT in win ([b6191c8](https://github.com/przemyslawpluta/node-youtube-dl/commit/b6191c8))
* spawn ENOENT in win ([a816720](https://github.com/przemyslawpluta/node-youtube-dl/commit/a816720))
* spawn ENOENT in win ([b6178e6](https://github.com/przemyslawpluta/node-youtube-dl/commit/b6178e6))
* tiny cleanup ([19a0059](https://github.com/przemyslawpluta/node-youtube-dl/commit/19a0059))
* update get formats regexp ([9df37f0](https://github.com/przemyslawpluta/node-youtube-dl/commit/9df37f0))
* update ugh tests ([db2388c](https://github.com/przemyslawpluta/node-youtube-dl/commit/db2388c))
* v1.3.3 ([f4498fa](https://github.com/przemyslawpluta/node-youtube-dl/commit/f4498fa))



<a name="1.3.2"></a>
## 1.3.2 (2013-10-22)

* improve regexp to download latest version ([9040f81](https://github.com/przemyslawpluta/node-youtube-dl/commit/9040f81))
* removed check for query.v that breaks soundcloud functionality ([11da4f7](https://github.com/przemyslawpluta/node-youtube-dl/commit/11da4f7))
* version bump ([60cce67](https://github.com/przemyslawpluta/node-youtube-dl/commit/60cce67))



<a name="1.3.1"></a>
## 1.3.1 (2013-10-15)

* always download latest version of youtube-dl ([c7de217](https://github.com/przemyslawpluta/node-youtube-dl/commit/c7de217))
* fix reading download state ([174743a](https://github.com/przemyslawpluta/node-youtube-dl/commit/174743a))
* formats change :/ ([e6f172d](https://github.com/przemyslawpluta/node-youtube-dl/commit/e6f172d))
* make sure to delete downloaded file ([be74d80](https://github.com/przemyslawpluta/node-youtube-dl/commit/be74d80))
* only download if new version ([1c8211c](https://github.com/przemyslawpluta/node-youtube-dl/commit/1c8211c))
* specify format to download ([429687c](https://github.com/przemyslawpluta/node-youtube-dl/commit/429687c))
* v1.3.1 ([23128d7](https://github.com/przemyslawpluta/node-youtube-dl/commit/23128d7))



<a name="1.3.0"></a>
# 1.3.0 (2013-09-13)

* add getFormats() ([604fa7b](https://github.com/przemyslawpluta/node-youtube-dl/commit/604fa7b))
* some style changes ([08a2ba5](https://github.com/przemyslawpluta/node-youtube-dl/commit/08a2ba5))
* version bump ([1735865](https://github.com/przemyslawpluta/node-youtube-dl/commit/1735865))



<a name="1.2.12"></a>
## 1.2.12 (2013-08-27)

* add id to download info ([eb92288](https://github.com/przemyslawpluta/node-youtube-dl/commit/eb92288))
* better info test ([e4a1b2f](https://github.com/przemyslawpluta/node-youtube-dl/commit/e4a1b2f))
* take into account multi line descriptions ([63ad7c2](https://github.com/przemyslawpluta/node-youtube-dl/commit/63ad7c2))
* version bump ([8625ff4](https://github.com/przemyslawpluta/node-youtube-dl/commit/8625ff4))



<a name="1.2.11"></a>
## 1.2.11 (2013-08-23)

* add id, itag, and resolution to `info()` ([11c7f68](https://github.com/przemyslawpluta/node-youtube-dl/commit/11c7f68))
* version bump ([c5fc896](https://github.com/przemyslawpluta/node-youtube-dl/commit/c5fc896))



<a name="1.2.10"></a>
## 1.2.10 (2013-08-04)

* cleaner example output ([7fcdf8f](https://github.com/przemyslawpluta/node-youtube-dl/commit/7fcdf8f))
* correctly split lines ([13368d1](https://github.com/przemyslawpluta/node-youtube-dl/commit/13368d1))
* update event-stream ([87983c1](https://github.com/przemyslawpluta/node-youtube-dl/commit/87983c1))
* version bump ([b605c93](https://github.com/przemyslawpluta/node-youtube-dl/commit/b605c93))



<a name="1.2.9"></a>
## 1.2.9 (2013-08-04)

* error checking ([524416b](https://github.com/przemyslawpluta/node-youtube-dl/commit/524416b))
* update youtube-dl version ([f4d21ec](https://github.com/przemyslawpluta/node-youtube-dl/commit/f4d21ec))
* version bump ([4fc9e1c](https://github.com/przemyslawpluta/node-youtube-dl/commit/4fc9e1c))



<a name="1.2.8"></a>
## 1.2.8 (2013-05-17)

* [ci skip] ([8af4a1f](https://github.com/przemyslawpluta/node-youtube-dl/commit/8af4a1f))
* check if progress is printed at least once ([189834d](https://github.com/przemyslawpluta/node-youtube-dl/commit/189834d))
* fix tests ([e0895a4](https://github.com/przemyslawpluta/node-youtube-dl/commit/e0895a4))
* minor cosmetics ([af3a82c](https://github.com/przemyslawpluta/node-youtube-dl/commit/af3a82c))
* more thorough tests ([1d96ad2](https://github.com/przemyslawpluta/node-youtube-dl/commit/1d96ad2))
* Release v1.2.8 ([85ca0da](https://github.com/przemyslawpluta/node-youtube-dl/commit/85ca0da))
* update exists method ([1fbfb00](https://github.com/przemyslawpluta/node-youtube-dl/commit/1fbfb00))
* update node versions ([73e93d1](https://github.com/przemyslawpluta/node-youtube-dl/commit/73e93d1))
* update regexp for download progress ([f64ff44](https://github.com/przemyslawpluta/node-youtube-dl/commit/f64ff44))
* update where youtube-dl is downloaded from ([dfe6234](https://github.com/przemyslawpluta/node-youtube-dl/commit/dfe6234))



<a name="1.2.7"></a>
## 1.2.7 (2012-08-19)

* cleanup ([36e8741](https://github.com/przemyslawpluta/node-youtube-dl/commit/36e8741))
* link to ytdl ([fc09348](https://github.com/przemyslawpluta/node-youtube-dl/commit/fc09348))
* Release v1.2.7 ([dafa422](https://github.com/przemyslawpluta/node-youtube-dl/commit/dafa422))
* version bump ([236a4a7](https://github.com/przemyslawpluta/node-youtube-dl/commit/236a4a7))



<a name="1.2.6"></a>
## 1.2.6 (2012-08-01)

* buffer info call ([c46a993](https://github.com/przemyslawpluta/node-youtube-dl/commit/c46a993))
* make sure to delete downloaded file ([5247bdb](https://github.com/przemyslawpluta/node-youtube-dl/commit/5247bdb))
* separate youtubedl stdout by line ([a1b7294](https://github.com/przemyslawpluta/node-youtube-dl/commit/a1b7294))
* version bump ([4f30db8](https://github.com/przemyslawpluta/node-youtube-dl/commit/4f30db8))



<a name="1.2.5"></a>
## 1.2.5 (2012-07-07)

* [fix] path.existsSync was moved to fs.existsSync ([aadc85a](https://github.com/przemyslawpluta/node-youtube-dl/commit/aadc85a))
* added node v0.8 ([a0dc4d8](https://github.com/przemyslawpluta/node-youtube-dl/commit/a0dc4d8))
* existsSync ([876d969](https://github.com/przemyslawpluta/node-youtube-dl/commit/876d969))
* fix existsSync ([24b7db7](https://github.com/przemyslawpluta/node-youtube-dl/commit/24b7db7))
* removed engines ([1e3c85e](https://github.com/przemyslawpluta/node-youtube-dl/commit/1e3c85e))
* use `fs.exists` ([658c651](https://github.com/przemyslawpluta/node-youtube-dl/commit/658c651))
* version bump ([6d678d8](https://github.com/przemyslawpluta/node-youtube-dl/commit/6d678d8))



<a name="1.2.4"></a>
## 1.2.4 (2012-03-10)

* more efficient youtube-dl download ([574cd7f](https://github.com/przemyslawpluta/node-youtube-dl/commit/574cd7f))
* ver bump ([fe10efb](https://github.com/przemyslawpluta/node-youtube-dl/commit/fe10efb))
* ver bump ([3fb0f0e](https://github.com/przemyslawpluta/node-youtube-dl/commit/3fb0f0e))



<a name="1.2.3"></a>
## 1.2.3 (2012-03-04)

* used `__dirname` instead of `./` to save download ([b5fb4bf](https://github.com/przemyslawpluta/node-youtube-dl/commit/b5fb4bf))
* used `path.join` to make it more cross-platform ([05c2ba3](https://github.com/przemyslawpluta/node-youtube-dl/commit/05c2ba3))



<a name="1.2.2"></a>
## 1.2.2 (2012-02-06)

* Better error reporting ([e853b64](https://github.com/przemyslawpluta/node-youtube-dl/commit/e853b64))



<a name="1.2.1"></a>
## 1.2.1 (2012-01-04)

* added test dir ([1695d60](https://github.com/przemyslawpluta/node-youtube-dl/commit/1695d60))
* added test script ([39ecfd6](https://github.com/przemyslawpluta/node-youtube-dl/commit/39ecfd6))
* better formatting ([16ad412](https://github.com/przemyslawpluta/node-youtube-dl/commit/16ad412))
* better versioning ([40d175e](https://github.com/przemyslawpluta/node-youtube-dl/commit/40d175e))
* cleared file ([c30ae25](https://github.com/przemyslawpluta/node-youtube-dl/commit/c30ae25))
* javascript syntax ([42c9fd9](https://github.com/przemyslawpluta/node-youtube-dl/commit/42c9fd9))
* organized readme ([c6069fd](https://github.com/przemyslawpluta/node-youtube-dl/commit/c6069fd))
* removed v0.5 ([ef5e15c](https://github.com/przemyslawpluta/node-youtube-dl/commit/ef5e15c))
* restored ([2ab9779](https://github.com/przemyslawpluta/node-youtube-dl/commit/2ab9779))
* travis ci ([548d808](https://github.com/przemyslawpluta/node-youtube-dl/commit/548d808))
* Written back to Javascript ([0063944](https://github.com/przemyslawpluta/node-youtube-dl/commit/0063944))



<a name="1.2.0"></a>
# 1.2.0 (2011-09-16)

* added filename to data returned ([49909ca](https://github.com/przemyslawpluta/node-youtube-dl/commit/49909ca))
* added tests ([1377915](https://github.com/przemyslawpluta/node-youtube-dl/commit/1377915))
* fixed installation issue ([d05b14c](https://github.com/przemyslawpluta/node-youtube-dl/commit/d05b14c))
* fixed symlink installation issue ([68199c0](https://github.com/przemyslawpluta/node-youtube-dl/commit/68199c0))



<a name="1.1.0"></a>
# 1.1.0 (2011-08-27)

* now uses emitter ([7063855](https://github.com/przemyslawpluta/node-youtube-dl/commit/7063855))
* update ([5c6ff08](https://github.com/przemyslawpluta/node-youtube-dl/commit/5c6ff08))



<a name="1.0.4"></a>
## 1.0.4 (2011-08-07)

* added *.mp4 ([6b7a1dc](https://github.com/przemyslawpluta/node-youtube-dl/commit/6b7a1dc))
* added scripts folder to tasks ([bfa584b](https://github.com/przemyslawpluta/node-youtube-dl/commit/bfa584b))
* added scripts to watch task ([0afc347](https://github.com/przemyslawpluta/node-youtube-dl/commit/0afc347))
* better organized ([dfd57c6](https://github.com/przemyslawpluta/node-youtube-dl/commit/dfd57c6))
* commit ([059d81b](https://github.com/przemyslawpluta/node-youtube-dl/commit/059d81b))
* convenience ([2cb471e](https://github.com/przemyslawpluta/node-youtube-dl/commit/2cb471e))
* fixed error in info function ([ea6ceda](https://github.com/przemyslawpluta/node-youtube-dl/commit/ea6ceda))
* fixed main ([572509b](https://github.com/przemyslawpluta/node-youtube-dl/commit/572509b))
* minimalist ([bb5c5fb](https://github.com/przemyslawpluta/node-youtube-dl/commit/bb5c5fb))
* now requires coffee-script to run ([8be7f53](https://github.com/przemyslawpluta/node-youtube-dl/commit/8be7f53))
* organized ([aeaf9c8](https://github.com/przemyslawpluta/node-youtube-dl/commit/aeaf9c8))
* organized ([2544054](https://github.com/przemyslawpluta/node-youtube-dl/commit/2544054))
* organized ([cbea725](https://github.com/przemyslawpluta/node-youtube-dl/commit/cbea725))
* removed coffeescript from installation ([b5bc9d8](https://github.com/przemyslawpluta/node-youtube-dl/commit/b5bc9d8))
* updated version number ([df8861a](https://github.com/przemyslawpluta/node-youtube-dl/commit/df8861a))
* when finished downloading, statistics data will be passed ([77a99e5](https://github.com/przemyslawpluta/node-youtube-dl/commit/77a99e5))



